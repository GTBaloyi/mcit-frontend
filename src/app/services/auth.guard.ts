import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from "../models/User";


@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    private loggedIn: boolean = false;
    private userStatus: number = 0;
    private loginInfo: User = null;
    private password: string;
    private username: string;

    constructor(private router: Router) {

    }




    userValidation(user: User, password: string, username: string){
        this.loggedIn = user.loggedIn;
        this.password = password;
        this.username =  username;
        this.userStatus = user.userStatus;
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.loginInfo  = JSON.parse(sessionStorage.getItem("loginInfo"));

         if(this.loginInfo != null) {
            this.loggedIn = this.loginInfo.loggedIn;

            if (this.loggedIn && this.userStatus == 1 ) {
                return true;
            }else if(this.loggedIn && this.userStatus == 2){
                this.router.navigate(['/password-reset'], {state:{password: this.password, username: this.username}});
                return true;
            }else if(this.loggedIn && this.userStatus == 3 || this.loggedIn && this.userStatus == 4 ){
                this.router.navigate(['/login']);
                return true;
            }else {
                this.router.navigate(['/landing-page']);
                return false;
            }
        }else {
            this.router.navigate(['/landing-page']);
            return false;
        }
    }
}