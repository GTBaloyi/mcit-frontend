import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {LoginResponseModel, UsersService} from "../../services";
import {AuthGuard} from "../../services/auth.guard";
import {Router} from "@angular/router";
import {ClientRegistrationRequestModel} from "../../services/model/models";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    isLoading = new Subject<boolean>();
    private username: string;
    private password: string;
    private user: LoginResponseModel;
    private titles: Array<string> = ['Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr'];
    private gender: Array<string> = ['Male', 'Female', 'Other'];
    private companyProfile: Array<string> = ['Small', 'Large', 'HEIs/Science Council', 'Techno/Star-Entrepreneur'];
    private result: ClientRegistrationRequestModel;
    private Newuser: ClientRegistrationRequestModel = <ClientRegistrationRequestModel>{} ;
    private termsConditions: boolean = false;

    constructor(config: NgbDropdownConfig, private usersService: UsersService, private authGuard: AuthGuard, private router: Router,private toastr: ToastrService) {
        config.placement = 'bottom-right';
    }

    ngOnInit() {
        this.Newuser.title = 'Mr';
        this.Newuser.gender = 'Male';
        this.Newuser.companyProfile = 'Small';

    }

    public signIn(username: string, password: string) {

        if(username == '' && password == ''){
            this.toastr.error('Please enter a username and password', 'Missing Fields',{
                timeOut: 3000,
            });

        }else if(username == ''){
            this.toastr.error('Please enter a username', 'Missing Fields',{
                timeOut: 3000,
            });

        }else if( password == ''){
            this.toastr.error('Please enter a password', 'Missing Fields', {
                timeOut: 3000,
            });
        }else if (username != '' && password != ''){
            this.isLoading.next(true);

            this.usersService.apiUsersLoginGet(username, password).subscribe(

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
                    this.authGuard.userValidation(this.user, password, username);
                    if(this.user.userStatus == 1){
                        this.showSuccess();
                    }else if(this.user.userStatus == 3){
                        this.showCustomToast();
                    }
                    sessionStorage.setItem('username', JSON.stringify(username));
                    this.isLoading.next(false);
                    this.router.navigateByUrl('/dashboard');

                }
            )
        }

    }

    singUp() {

        if(this.termsConditions) {
            this.Newuser.isCompanyPresent = true;
            this.Newuser.avatar = '';

            this.isLoading.next(true);
            this.usersService.apiUsersClientRegistrationPost(this.Newuser).subscribe(
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
        this.toastr.error('Opps, an error occurred. Please try again.', 'Error!!!', {
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
    }}
