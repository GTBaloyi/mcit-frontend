import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from "../models/User";


@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    private loggedIn: boolean = false;
    private accountActive: number = 0;
    private loginInfo: User = null;


    constructor(private router: Router) {

    }




    userValidation(user: User){
        this.loggedIn = user.loggedIn
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.loginInfo  = JSON.parse(sessionStorage.getItem("loginInfo"));

         if(this.loginInfo != null) {
            this.loggedIn = this.loginInfo.loggedIn;
            //this.accountActive = this.loginInfo.userStatus;

            if (this.loggedIn && this.accountActive == 1 ) {
                return true;
            }else if(this.loggedIn && this.accountActive == 0){
                this.router.navigate(['/password-reset']);
                return true;
            } else {
                this.router.navigate(['/landing-page']);
                return false;
            }
        }else {
            this.router.navigate(['/landing-page']);
            return false;
        }
    }
}