import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {
  ClientRegistrationRequestModel,
  InvoiceResponseModel, InvoiceService, ProductsService, ProjectInformationResponseModel, ProjectsService,
  QuotationResponseModel,
  QuotationService
} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isLoading = new Subject<boolean>();
  private projects: Array<ProjectInformationResponseModel> = [];
  private userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;
  private filter : string;
  private config: any;

  constructor(private projectsService: ProjectsService,
              private router: Router,
              private toastr: ToastrService) {

    this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));

  }

  ngOnInit() {
    this.getProjects();

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.projects.length
    };
  }

  getProjects(){
    this.projectsService.apiProjectsAllProjectsGet().subscribe (
        (data: any) => {
          this.projects = data
          console.log('projects: ', data);
        },
        error => {
          console.log(error);
          this.showError();
        },
        () => {
          this.showSuccess();
        }
    )

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  showSuccess() {
    this.toastr.success('Process successfully completed', 'Success', {
      timeOut: 3000,
    });
  }

  showError() {
    this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
      timeOut: 3000,
    });
  }
}
