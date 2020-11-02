import { Component, OnInit } from '@angular/core';
import {ClientInvoiceSummary, ClientsReportsService, ClientsService, ProjectInformationResponseModel, ProjectsService} from "../../services";
import {ClientRegistrationRequestModel} from "../../services/model/models";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    heading = 'Analytics Dashboard';
    subheading = 'Summary of available reports';
    icon = 'pe-7s-home icon-gradient bg-tempting-azure';

    isLoading = true;
     emailAddress : string;
     userInformation : ClientRegistrationRequestModel;
     clientInvoiceSummary : ClientInvoiceSummary = {};
     projects: Array<ProjectInformationResponseModel> = [];
     config: any;

    constructor(public projectsService: ProjectsService,
                public router: Router,
                public toastr: ToastrService,
                public clientsReportsService : ClientsReportsService,
                public clientService: ClientsService) {
    }


    ngOnInit() {
        this.emailAddress  = JSON.parse(sessionStorage.getItem("username"));
        this.getClientInformation(this.emailAddress);

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.projects.length
        };
    }


    public getInvoiceInformation() {
        this.isLoading = true;

        this.clientsReportsService.apiClientsReportsInvoiceSummaryCompanyRegistrationGet(this.userInformation.companyRegistrationNumber).subscribe(
            (data) => {
                this.clientInvoiceSummary = data;
            },
            error => {
                this.isLoading = false;

            },
            () => {
                this.isLoading = false;
            }
        );
    }

    public getClientInformation(email: string) {
        this.isLoading = true;

        this.clientService.apiClientsByEmailEmailGet(email).subscribe(

            (data: ClientRegistrationRequestModel) => {
                this.userInformation = data;
            },
            error => {
                this.isLoading = false;

            },
            () => {
                this.isLoading = false;
                sessionStorage.setItem('userInformation', JSON.stringify(this.userInformation));
                this.getInvoiceInformation();
                this.getProjects();
            }
        );
    }


    pageChanged(event){
        this.config.currentPage = event;
    }

    getProjects() {
        this.isLoading = true;

        this.projectsService.apiProjectsByCompanyCompanyRegistrationGet(this.userInformation.companyRegistrationNumber).subscribe(
            (data: any) => {
                this.projects = data;
            },
            error => {
                this.isLoading = false;

                console.log(error);
            },
            () => {
                this.isLoading = false;
                this.sortData;
            }
        )

    }

    get sortData(): Array<ProjectInformationResponseModel> {
        return this.projects.sort((projectUnsorted, projectSorted) => {
            return <any>new Date(projectSorted.projectProgress.actualStartDate) - <any>new Date(projectUnsorted.projectProgress.actualStartDate);
        });
    }

    getProgressPercentage(value): string {
        return value + '%';
    }
}

