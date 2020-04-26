import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/AuthenticationService";
import {User} from "../../models/User";
import {AuthGuard} from "../../services/auth.guard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Subject} from "rxjs";



@Component({
    selector: 'user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnChanges, OnInit {

    private username: string;
    private password: string;
    private user: User;
    isLoading = new Subject<boolean>();


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

    signIn(username: string, password: string) {

        this.isLoading.next(true);

        this.authenticationService.login(username, password).subscribe(
            (data: User) => {
                this.user = data;
                if (this.user != null) {
                    this.user.loggedIn = true;
                    localStorage.setItem('currentUser', this.user.name + " " + this.user.surname);
                }
                sessionStorage.setItem('loginInfo', JSON.stringify(data));

            },
            error => {
                console.log(error);
                this.openSnackBar('Incorrect username / password', 'Ok');
                this.isLoading.next(false);

            },
            () => {
                this.authGuard.userValidation(this.user);
                this.openSnackBar('login successful', 'Ok');
                this.isLoading.next(false);
                this.router.navigateByUrl('/dashboard');

            }
        )
    }
}