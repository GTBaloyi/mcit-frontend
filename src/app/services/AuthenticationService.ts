import {Inject, Injectable} from '@angular/core';

import {BASE_API_URL} from "../../ApiModule";
import {Observable, throwError} from "rxjs";
import {Register, User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {

    public baseUrl;


    constructor(public http: HttpClient, @Inject(BASE_API_URL) BASE_API_URL : string) {
        this.baseUrl = BASE_API_URL;

    }


    handleErrorObservable(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = ` Message: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    login(username: string, password: string): Observable<User> {

        return this.http.get<User>(`${this.baseUrl}/Users/login?username=${username}&password=${password}`).pipe(
            catchError(this.handleErrorObservable)
        );
    }

    register(newUser: Register): Observable<Register> {

        return this.http.post<Register>(`${this.baseUrl}/Users/client-registration`, newUser).pipe(
            catchError(this.handleErrorObservable)
        );
    }

    //Todo
    resetPassword(username:string, oldPassword:string, newPassword: string){

        return this.http.put(`${this.baseUrl}/reset-password?username=${username}&oldPassword=${oldPassword}&newPassword=${newPassword}`, '').pipe(
            catchError(this.handleErrorObservable)
        );
    }

}