import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/AuthenticationService";
import {User} from "../../models/User";
import {AuthGuard} from "../../services/auth.guard";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";



@Component({
    selector: 'user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnChanges, OnInit{

    private username: string;
    private password: string;
    private user: User;

    ngOnInit(){

    }


    ngOnChanges() {
    }


    constructor(public authenticationService: AuthenticationService, public authGuard: AuthGuard, private _snackBar: MatSnackBar,private router: Router) {

    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 10000,
        });
    }

    signIn (username: string, password: string) {

        const spinner  = document.getElementById('loading');
        spinner.style.display = 'flex';

        this.authenticationService.login(username, password).subscribe(
            (data: User) => {
                this.user = data;
                if(this.user != null){
                    this.user.loggedIn = true;
                    localStorage.setItem('currentUser', this.user.name +" "+ this.user.surname);
                }

            },
            error => {
                console.log(error);
                this.openSnackBar('Incorrect username / password', 'Ok');
                spinner.style.display = 'none';

            },
            () =>{
                console.log('user information ', this.user);
                this.authGuard.userValidation(this.user);
                this.openSnackBar('login successful','Ok');
                spinner.style.display = 'none';
                this.router.navigateByUrl('/dashboard');

            }
        )
    }


    fabButtonsRandom: MatFabMenu[] = [
        {
            id: 1,
            icon: 'create'
        },
        {
            id: 2,
            icon: 'mail'
        },
        {
            id: 3,
            icon: 'file_copy'
        },
        {
            id: 4,
            icon: 'phone'
        },
    ];


}
