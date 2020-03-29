import {Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BASE_API_URL} from "../../ApiModule";



export class AuthenticationService {
    public baseUrl;


    constructor(private http: HttpClient, @Inject(BASE_API_URL) BASE_API_URL : string) {

        this.baseUrl = BASE_API_URL;
        console.log("service url:", this.baseUrl)
    }


}