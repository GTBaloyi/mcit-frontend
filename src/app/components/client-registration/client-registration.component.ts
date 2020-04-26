import {Component, OnChanges, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {AuthenticationService} from "../../services/AuthenticationService";
import {AuthGuard} from "../../services/auth.guard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Register, User} from "../../models/User";


@Component({
  selector: 'client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnChanges, OnInit  {

    private title: string;
    private lastName: string;
    private companyName: string;
    private vatNumber: string;
    private phone: string;
    private email: string;
    private website: string;
    private addressLine1: string;
    private addressLine2: string;
    private city: string;
    private province: string;
    private postalCode: string;
    private country: string;
    isLoading = new Subject<boolean>();
    private result: Register;

    ngOnInit() {

    }


    ngOnChanges() {
    }


    constructor(public authenticationService: AuthenticationService, public authGuard: AuthGuard, private _snackBar: MatSnackBar, private router: Router) {

    }


    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 10000,
        });
    }

    singUp() {

        let newUser: Register = null;

        this.isLoading.next(true);

        this.authenticationService.register(newUser).subscribe(
            (data: Register) => {
                this.result = data;

            },
            error => {
                console.log(error);
                this.openSnackBar('Registration failed, please try again later', 'Ok');
                this.isLoading.next(false);
            },
            () => {
                this.openSnackBar('Registration successful', 'Ok');
                this.isLoading.next(false);
                this.router.navigateByUrl('/landing-page');

            }
        )
    }

}

