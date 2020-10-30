import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginResponseModel, UsersService} from "../../services";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AuthGuard} from "../../services/auth.guard";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    public user : LoginResponseModel;
    public oldPassword : string;
    public newPassword : string;
    public username : string;
    isLoading = new Subject<boolean>();

    constructor(public formBuilder: FormBuilder,
                public router: Router,
                public usersService: UsersService,
                public authGuard: AuthGuard){

        if(this.router.getCurrentNavigation().extras.state != undefined) {
            this.oldPassword = this.router.getCurrentNavigation().extras.state.password;
            this.username = this.router.getCurrentNavigation().extras.state.username;
        }else{
            this.router.navigateByUrl('/landing-page');
        }
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem("loginInfo"));
    }


    changePassword(changePasswordForm) {
        this.isLoading.next(true);

        this.usersService.apiUsersResetPasswordPut(this.username, this.oldPassword, changePasswordForm.value.newPassword,1).subscribe(

            (data: Observable<any>) => {
                console.log(data)
            },
            error => {
                if(error.status == 200){
                    this.user.userStatus = 1;
                    sessionStorage.setItem('loginInfo', JSON.stringify(this.user));
                    this.authGuard.userValidation(this.user, '', this.username);
                    this.isLoading.next(false);
                    this.router.navigateByUrl('/dashboard');
                }else{
                    this.isLoading.next(false);
                    console.log(error);
                }
            },
            () => {
                this.user.userStatus = 1;
                sessionStorage.setItem('loginInfo', JSON.stringify(this.user));
                this.isLoading.next(false);
                this.router.navigateByUrl('/dashboard');

            }
        )
    }

}
