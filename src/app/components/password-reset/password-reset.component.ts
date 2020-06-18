import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
    passwordContainsLowercase,
    passwordContainsNumbers,
    passwordMatchValidator, passwordStrong,
    passwordUppercaseValidator
} from "../../models/Password-validator";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/AuthenticationService";
import {Subject} from "rxjs";
import {AuthGuard} from "../../services/auth.guard";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnChanges {

    private formGroup: FormGroup;
    private user : User;
    private oldPassword : string;
    private username : string;
    isLoading = new Subject<boolean>();



    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authenticationService: AuthenticationService,
                private authGuard: AuthGuard,
                private _snackBar: MatSnackBar){

        if(this.router.getCurrentNavigation().extras.state != undefined) {
            this.oldPassword = this.router.getCurrentNavigation().extras.state.password;
            this.username = this.router.getCurrentNavigation().extras.state.username;
        }else{
            this.router.navigateByUrl('/login');
        }
    }

    ngOnInit(): void {

        this.user = JSON.parse(sessionStorage.getItem("loginInfo"));

        this.formGroup = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
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


    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 10000,
        });
    }

    resetPassword() {
        this.isLoading.next(true);

        this.authenticationService.resetPassword(this.username, this.oldPassword, this.confirmPassword.value).subscribe(

            () => {

            },
            error => {
                this.isLoading.next(false);
                this.openSnackBar('something went wrong, please try again later', 'Ok');
                console.log(error);

            },
            () => {
                this.user.userStatus = 1;
                sessionStorage.setItem('loginInfo', JSON.stringify(this.user));
                this.openSnackBar('password reset successfully', 'Ok');
                this.isLoading.next(false);
                this.router.navigateByUrl('/dashboard');

            }
        )
    }

}
