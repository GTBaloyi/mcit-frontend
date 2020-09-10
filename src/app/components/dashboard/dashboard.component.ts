import { Component, OnInit } from '@angular/core';
import {ClientsService, ProjectInformationResponseModel, ProjectsService} from "../../services";
import {ClientRegistrationRequestModel} from "../../services/model/models";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Color} from "ng2-charts";


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    heading = 'Analytics Dashboard';
    subheading = 'Summary of available reports';
    icon = 'pe-7s-home icon-gradient bg-tempting-azure';


    isLoading = new Subject<boolean>();
    private emailAddress : string;
    private userInformation : ClientRegistrationRequestModel;
    private projects: Array<ProjectInformationResponseModel> = [];
    private filter : string;
    private config: any;

    constructor(private projectsService: ProjectsService,
                private router: Router,
                private toastr: ToastrService,
                private clientService: ClientsService) {
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));
    }


    ngOnInit() {
        this.emailAddress  = JSON.parse(sessionStorage.getItem("username"));
        this.getClientInformation(this.emailAddress);

        this.getProjects();
        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.projects.length
        };
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

    getProjects(){
        this.projectsService.apiProjectsAllProjectsGet().subscribe (
            (data: any) => {
                this.projects = data
                console.log('projects: ', data);
            },
            error => {
                console.log(error);
            },
            () => {
            }
        )

    }

    pageChanged(event){
        this.config.currentPage = event;
    }
}

