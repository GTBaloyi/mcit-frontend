import { Component, OnInit } from '@angular/core';
import {
    EmployeeRequestModel,
    EmployeesService,
    InvoiceService, ProjectExpenditureService,
    ProjectInformationRequestModel, ProjectInformationResponseModel,
    ProjectsService, ProjectTodosRequestModel,
    ProjectTodosService
} from "../../services";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
    heading = 'Projects';
    subheading = 'View all available projects';
    icon = 'pe-7s-hammer icon-gradient bg-tempting-azure';

    public config: any;
    isLoading = new Subject<boolean>();
    public employeeInformation: EmployeeRequestModel;
    public ProjectTodoItems: ProjectTodosRequestModel[] = [];
    public project: ProjectInformationResponseModel = <ProjectInformationResponseModel>'';
    public currentRate = 0;

    constructor(public router: Router,
                public toastr: ToastrService,
                public modalService: NgbModal,
                public projectTodosService: ProjectTodosService,
                public projectsService: ProjectsService,
                public projectService: ProjectsService,
                public employeeService: EmployeesService) {
        this.project = JSON.parse(sessionStorage.getItem("projectDetails"));

    }

    ngOnInit() {
        this.getEmployeeInfo();
        this.getTodoItems();
        this.getProject();

        this.config = {
            itemsPerPage: 7,
            currentPage: 1,
            totalItems: this.ProjectTodoItems.length
        };
    }

    getProject() {
        this.projectService.apiProjectsByProjectNumberProjectNumberGet(this.project.projectNumber).subscribe(
            (data: any) => {
                this.project = data
            },
            error => {
                console.log(error);
            }
        )
    }

    pageChanged(event) {
        this.config.currentPage = event;
    }

    disableButton(): boolean {
        if (this.project.projectProgress.projectStatus === 'Completed' && this.project.projectSatisfaction == 0) {
            return false;
        } else {
            return true;
        }
    }

    getProgressPercentage(value): string {
        return value + '%';
    }

    openModal(value: any, data: any) {
        this.modalService.open(value);
    }

    getRatingPercentage(value): number {
        return (value * 100) / 5;
    }

    rateProject() {

        var projectSatisfaction = this.getRatingPercentage(this.currentRate)
        var project: ProjectInformationRequestModel = {};

        project.id = this.project.id;
        project.projectNumber = this.project.projectNumber;
        project.projectName = this.project.projectName;
        project.isSequential = false;
        project.projectDescription = this.project.projectDescription;
        project.invoiceReferenceNumber = this.project.invoiceReferenceNumber;
        project.companyRegistrationNumber = this.project.companyRegistrationNumber;
        project.projectSatisfaction = projectSatisfaction;
        project.createdOn = this.project.createdOn;
        project.projectLeaderId = this.project.projectLeaderId;

        this.isLoading.next(true);

        this.projectsService.apiProjectsUpdateProjectPut(project).subscribe(
            (data: any) => {
            },
            error => {
                if (error.status == 200) {
                    this.isLoading.next(false);
                    this.modalService.dismissAll();
                    this.showSuccess();
                } else {
                    console.log(error);
                    this.isLoading.next(false);
                    this.showError();
                }
            },
            () => {
                this.isLoading.next(false);
                this.showSuccess();
            }
        );
    }

    getEmployeeInfo() {
        this.employeeService.apiEmployeesEmployeeNumberGet(this.project.projectLeaderId).subscribe(
            (data: any) => {
                this.employeeInformation = data;
            },
            error => {
                console.log(error);
            },
            () => {
            }
        );
    }

    getTodoItems() {
        this.isLoading.next(true);

        this.projectTodosService.apiProjectTodosProjectNumberProjectNumberGet(this.project.projectNumber).subscribe(
            (data: any) => {
                this.ProjectTodoItems = data;
            },
            error => {
                if (error.status == 200) {
                    this.isLoading.next(false);
                    this.modalService.dismissAll();
                    this.showSuccess();
                } else {
                    console.log(error);
                    this.isLoading.next(false);
                    this.showError();
                }
            },
            () => {
                this.isLoading.next(false);
                this.showSuccess();
            }
        );
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
