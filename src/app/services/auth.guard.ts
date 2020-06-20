import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from "../models/User";


@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    private  loggedIn: boolean = false;

    constructor(private router: Router) {

    }

    userValidation(user: User){
        this.loggedIn = user.loggedIn
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(this.loggedIn != null){
            if (this.loggedIn) {
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}