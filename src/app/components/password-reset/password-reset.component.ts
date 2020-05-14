import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
    passwordContainsLowercase,
    passwordContainsNumbers,
    passwordMatchValidator, passwordStrong,
    passwordUppercaseValidator
} from "../../models/Password-validator";
import {User} from "../../models/User";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnChanges {

    private minLength = 8;
    private maxLength = 100;
    private formGroup: FormGroup;
    private user : User;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.user  = JSON.parse(sessionStorage.getItem("loginInfo"));

        this.formGroup = this.formBuilder.group({
            password: ['', [
                    Validators.required,
                    Validators.minLength(this.minLength),
                    Validators.maxLength(this.maxLength),
                ]
            ],
            confirmPassword: ['', [Validators.required]]
        }, {
            validator: [
                passwordMatchValidator,
                passwordUppercaseValidator,
                passwordContainsLowercase,
                passwordContainsNumbers,
                passwordStrong
            ]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onPasswordInput();

    }

    get password() {
        return this.formGroup.get('password');
    }

    get confirmPassword() {
        return this.formGroup.get('confirmPassword');
    }

    onPasswordInput() {

        if (this.formGroup.hasError('passwordMismatch'))
            this.confirmPassword.setErrors({'passwordMismatch': true});
        else
            this.confirmPassword.setErrors(null);

        if (this.formGroup.hasError('passwordNoUppercase'))
            this.password.setErrors({'passwordNoUppercase': true});
        else
            this.password.setErrors(null);


        if (this.formGroup.hasError('passwordNoLowercase'))
            this.password.setErrors({'passwordNoLowercase': true});
        else
            this.password.setErrors(null);


        if (this.formGroup.hasError('passwordNoNumbers'))
            this.password.setErrors({'passwordNoNumbers': true});
        else
            this.password.setErrors(null);



        if (!this.formGroup.hasError('passwordIsStrong'))
            this.password.setErrors({'passwordIsStrong': true});
        else
            this.password.setErrors(null);

    }

}
