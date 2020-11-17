import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordValidators } from 'src/app/services/password.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ProcessService } from 'src/app/services/process.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup-index',
  templateUrl: './signup-index.component.html',
  styleUrls: ['./signup-index.component.scss']
})
export class SignupIndexComponent implements OnInit, OnDestroy {
  returnUrl: string;
  paramsSubscription: Subscription;
  subscription: Subscription;

  hidePassword: boolean = true;
  started: boolean = true;
  isProcessing: boolean = false;
  signUpBasicForm: FormGroup

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private accountService: AccountService,
    private router: Router,
    private process: ProcessService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpBasicForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)]],
      cPassword: ['', [Validators.required]],
      agreement: ['', [Validators.requiredTrue]]
    }, { validators: [PasswordValidators.comparePasswords('password', 'cPassword')] })
    this.returnUrl = this.route.snapshot.queryParams['continue'] || '/';
    this.paramsSubscription = this.route.queryParams.subscribe(q => {
      this.returnUrl = q['continue'];
    })
  }


  getError(control = 'email') {
    const { message } = this.signUpBasicForm.get(control).errors;
    return message;
  }

  setError(error: any, control = 'email') {
    this.signUpBasicForm.get(control).setErrors(error);
    this.signUpBasicForm.updateValueAndValidity()
    this.process.stopProgress();
    return this.isProcessing = false;
  }

  async doSignup(form: any) {
    this.process.startProgress()
    this.isProcessing = true;
    if (!this.signUpBasicForm.valid) return;
    this.subscription = this.accountService.createUser(form).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.processError(err);
      return of(null);
    })).subscribe(async (res) => {
      if (!res) return;
      const token = res.headers.get('x-auth-token')
      if (!token) return this.setError('Something went wrong')
      const signedUser = await this.auth.signInWithCustomToken(token);
      if (!signedUser) return this.setError('Something went wrong')
      const send = await signedUser.user.sendEmailVerification();
      this.auth.logout();
      this.started = false;
      this.isProcessing = false;
      this.process.stopProgress();
    });
  }

  navToLogin() {
    this.router.navigate(['/login'], { preserveQueryParams: true })
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe()
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe()
  }

  processError(res: HttpErrorResponse) {
    if (res.error?.error) this.setError(res.error?.error);
  }
}
