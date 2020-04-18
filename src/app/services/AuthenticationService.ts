import {Inject, Injectable} from '@angular/core';

import {BASE_API_URL} from "../../ApiModule";
import {Observable, of, throwError} from "rxjs";
import {User} from "../models/User";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {

    public baseUrl;


    constructor(public http: HttpClient, @Inject(BASE_API_URL) BASE_API_URL : string) {
        this.baseUrl = BASE_API_URL;

    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
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

        return this.http.get<User>(
           `${this.baseUrl}/Users/login?username=${username}&password=${password}`).pipe(
               catchError(this.handleErrorObservable
            )
           );
    }


    logout( user: User) {
        localStorage.removeItem('currentUser');

        user = null;
    }

}