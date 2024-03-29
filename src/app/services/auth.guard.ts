import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {LoginResponseModel} from "./index";


@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    private loggedIn: boolean;
    private userStatus: number;
    private loginInfo: LoginResponseModel = null;
    private password: string;
    private username: string;

    constructor(private router: Router) {

    }


    userValidation(user: LoginResponseModel, password: string, username: string){
        this.loggedIn = user.loggedIn;
        this.password = password;
        this.username =  username;
        this.userStatus = user.userStatus;
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));

        if(this.loginInfo != null) {

            if(this.userStatus == null){
                this.userStatus = this.loginInfo.userStatus;
            }

            if(this.loggedIn == null){
                this.loggedIn = this.loginInfo.loggedIn;
            }

            if (this.loggedIn && this.userStatus == 1 ) {
                return true;
            }else if(this.loggedIn && this.userStatus == 2){
                this.router.navigate(['/change-password'], {state:{password: this.password, username: this.username}});
                return true;
            }else if(this.loggedIn && this.userStatus == 3 || this.loggedIn && this.userStatus == 4 ){
                this.router.navigate(['/landing-page']);
                return false;
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