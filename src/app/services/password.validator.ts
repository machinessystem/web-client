import { FormGroup } from '@angular/forms';

export class PasswordValidators {
    static comparePasswords(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.passwordsNotMatched) return;

            if (control.value !== matchingControl.value) return matchingControl.setErrors({ passwordsNotMatched: true });
            return matchingControl.setErrors(null);
        };
    }

} 