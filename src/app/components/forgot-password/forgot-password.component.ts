import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginResponseModel, UsersService} from "../../services";
import {Subject} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    isLoading = new Subject<boolean>();
    private companyRegistration: string;
    private email: string;
    private contactNumber: string;

    constructor(private toastr: ToastrService, private router: Router, private usersService: UsersService) { }

    ngOnInit() {
    }


    reset(companyRegistration: string, email: string, contactNumber: string ) {

        this.usersService.apiUsersForgotPasswordPut(companyRegistration, email, contactNumber).subscribe(

            () => {

            },
            error => {
                console.log(error);
                this.showError();
                this.isLoading.next(false);
            },
            () => {
                this.isLoading.next(false);
                this.showSuccess();
                this.router.navigateByUrl('/landing-page');
            }
        )
    }

    showSuccess() {
        this.toastr.success('Password reset successfully completed', 'Success', {
            timeOut: 3000,
        });
    }

    showError() {
        this.toastr.error('Opps, an error occurred. Please try again.', 'Error!!!', {
            timeOut: 3000,
        });
    }

}