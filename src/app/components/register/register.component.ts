import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {ClientRegistrationRequestModel, LoginResponseModel, UsersService} from "../../services";
import {LoginForm, RegistrationForm} from "../landing-page/landing-page.component";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {AuthGuard} from "../../services/auth.guard";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = new Subject<boolean>();
  private titles: Array<string> = ['Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr'];
  private genders: Array<string> = ['Male', 'Female', 'Other'];
  private companyProfiles: Array<string> = ['Small', 'Large', 'HEIs/Science Council', 'Techno/Star-Entrepreneur'];
  private result: ClientRegistrationRequestModel;
  private termsConditions: boolean = false;
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
