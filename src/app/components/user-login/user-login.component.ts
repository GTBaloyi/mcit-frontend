import {Component, Inject} from '@angular/core';
import {BASE_API_URL} from "../../../ApiModule";



@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

    public baseUrl;


    constructor( @Inject(BASE_API_URL) BASE_API_URL : string) {

        this.baseUrl = BASE_API_URL;
        console.log("service url:", this.baseUrl)
    }
}