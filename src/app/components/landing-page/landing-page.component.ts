import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {LoginResponseModel, UsersService} from "../../services";
import {AuthGuard} from "../../services/auth.guard";
import {Router} from "@angular/router";
import {ClientRegistrationRequestModel} from "../../services/model/models";
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

export interface LoginForm {
    email: string;
    password: any;
}
export interface RegistrationForm {
    contactName: string;
    contactSurname: string;
    title: string;
    gender: string;
    contactEmail: string;
    contactNumber: string;
    avatar: string;
    companyName: string;
    companyRegistrationNumber: string;
    isCompanyPresent: boolean;
    companyProfile: string;
}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    isLoading = new Subject<boolean>();
    private user: LoginResponseModel;
    private titles: Array<string> = ['Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr'];
    private genders: Array<string> = ['Male', 'Female', 'Other'];
    private companyProfiles: Array<string> = ['Small', 'Large', 'HEIs/Science Council', 'Techno/Star-Entrepreneur'];
    private result: ClientRegistrationRequestModel;
    private termsConditions: boolean = false;
    private login: LoginForm = <LoginForm>{};
    private registration: RegistrationForm =<RegistrationForm>{};

    constructor(config: NgbDropdownConfig,
                private usersService: UsersService,
                private authGuard: AuthGuard,
                private router: Router,
                private toastr: ToastrService) {
        config.placement = 'bottom-right';
    }

    ngOnInit() {
        this.registration.title = 'Mr';
        this.registration.gender = 'Male';
        this.registration.companyProfile = 'Small';
    }

    public signIn(loginForm: NgForm) {
        this.isLoading.next(true);
        this.usersService.apiUsersLoginGet(loginForm.value.email, loginForm.value.password).subscribe(
            (data: LoginResponseModel) => {
                this.user = data;
                if (this.user != null) {
                    this.user.loggedIn = true;
                    sessionStorage.setItem('loginInfo', JSON.stringify(data));
                }
            },
            error => {
                console.log(error);
                this.showError();
                this.isLoading.next(false);
            },
            () => {
                this.authGuard.userValidation(this.user,loginForm.value.password, loginForm.value.email);
                if(this.user.userStatus == 1){
                    this.showSuccess();
                }else if(this.user.userStatus == 3){
                    this.showCustomToast();
                }
                sessionStorage.setItem('username', JSON.stringify(loginForm.value.email));
                this.isLoading.next(false);
                this.router.navigateByUrl('/dashboard');
            }
        );
    }

    signUp(registrationForm) {

        if(this.termsConditions) {
            registrationForm.value.isCompanyPresent = true;
            registrationForm.value.avatar = '';

            this.isLoading.next(true);
            this.usersService.apiUsersClientRegistrationPost(registrationForm.value).subscribe(
                (data: any) => {
                    this.result = data;
                },
                error => {
                    console.log(error);
                    this.showError();
                    this.isLoading.next(false);
                },
                () => {
                    this.showSuccess();
                    this.isLoading.next(false);
                    this.router.navigateByUrl('/landing-page');

                }
            )
        }else{
            this.toastr.error('Please accept our terms and conditions then, try again.', 'Error!!!', {
                timeOut: 3000,
            });

        }
    }

    showSuccess() {
        this.toastr.success('Process successfully completed', 'Success', {
            timeOut: 3000,
        });
    }

    showError() {
        this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
            timeOut: 3000,
        });
    }


    showCustomToast() {
        this.toastr.info(
            'Oops, it looks like you account has been deactivated or suspended \n\nPlease contact support to have your account activated.', 'Account Deactivated', {
            timeOut: 3000,
        });
    }

    acceptTermsAndConditions(){
        this.termsConditions = !this.termsConditions;
    }
}
