import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from 'src/app/services/process.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  isProcessing: boolean = false;
  verificationNotChecked: boolean = true;
  loginForm: FormGroup
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private process: ProcessService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group(
      {
        identifier: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  async doLogin(form: any) {
    this.process.startProgress();
    this.isProcessing = true;
    if (!this.loginForm.valid) return;
    this.auth.login(form).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.processError(err);
      return of(null);
    })).subscribe(async (res) => {
      if (!res) return;
      const token = res.headers.get('x-auth-token');
      if (!token) return this.setError('Something went wrong');
      const signedUser = await this.auth.signInWithCustomToken(token);
      if (!signedUser) return this.setError('Something went wrong')
      this.process.stopProgress();
      const returnUrl = this.route.snapshot.queryParams['continue'] || '/';
      this.router.navigateByUrl(returnUrl);
    })
  }

  navToSignUp() {
    this.router.navigate(['/signup'], { preserveQueryParams: true })
  }

  navToForgotPassword() {
    this.router.navigate(['/account/reset'], { preserveQueryParams: true })
  }

  getError(control = 'identifier') {
    const { message } = this.loginForm.get(control).errors;
    return message;
  }

  setError(error: any, control = 'identifier') {
    this.loginForm.get(control).setErrors(error);
    this.loginForm.updateValueAndValidity();
    this.process.stopProgress();
    this.isProcessing = false;
  }

  processError(res: HttpErrorResponse) {
    if (res.error?.error) this.setError(res.error?.error);
  }


}