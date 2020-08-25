import { Component, OnInit } from '@angular/core';
import {ClientsService, LoginResponseModel} from "../../services";
import {ClientRegistrationRequestModel} from "../../services/model/models";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    private emailAddress : string;
    private userInformation : ClientRegistrationRequestModel;


    constructor(private clientService: ClientsService) { }


    ngOnInit() {
        this.emailAddress  = JSON.parse(sessionStorage.getItem("username"));
        this.getClientInformation(this.emailAddress);
    }


    public getClientInformation(email: string) {

        this.clientService.apiClientsByEmailEmailGet(email).subscribe(

            (data: ClientRegistrationRequestModel) => {
                this.userInformation = data;
            },
            error => {

            },
            () => {
                sessionStorage.setItem('userInformation', JSON.stringify(this.userInformation));
            }
        );
    }

}
