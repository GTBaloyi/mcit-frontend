import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ClientRegistrationRequestModel, ProjectInformationRequestModel, ProjectInformationResponseModel, ProjectsService} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  heading = 'Projects';
  subheading = 'View all available projects';
  icon = 'pe-7s-hammer icon-gradient bg-tempting-azure';


  isLoading = true;
  public projects: Array<ProjectInformationResponseModel> = [];
  public project: ProjectInformationResponseModel = {};
  public userInformation: ClientRegistrationRequestModel = <ClientRegistrationRequestModel>'';
  public filter: string;
  public config: any;
  public currentRate = 0;

  constructor(public projectsService: ProjectsService,
              public router: Router,
              public modalService: NgbModal,
              public toastr: ToastrService) {

    this.userInformation = JSON.parse(sessionStorage.getItem("userInformation"));

  }

  ngOnInit() {
    this.getProjects();

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.projects.length
    };
  }

  getProjects() {
    this.projectsService.apiProjectsByCompanyCompanyRegistrationGet(this.userInformation.companyRegistrationNumber).subscribe(
        (data: any) => {
          this.projects = data;
        },
        error => {
          console.log(error);
          this.showError();
        },
        () => {
          this.sortData;
          this.showSuccess();
        }
    )

  }

  getProgressPercentage(value): string {
    return value + '%';
  }

  disableButton(project): boolean {
    if (project.projectProgress.projectStatus === 'Completed' && project.projectSatisfaction == 0) {
      return false;
    } else {
      return true;
    }
  }

  get sortData(): Array<ProjectInformationResponseModel> {
    return this.projects.sort((projectUnsorted, projectSorted) => {
      return <any>new Date(projectSorted.projectProgress.actualStartDate) - <any>new Date(projectUnsorted.projectProgress.actualStartDate);
    });
  }

  projectDetails(project: ProjectInformationRequestModel) {
    sessionStorage.setItem('projectDetails', JSON.stringify(project));
    this.router.navigateByUrl('/project-details');
  }

  getRatingPercentage(value): number {
    return (value * 100) / 5;
  }

  rateProject(projectItem) {
    var projectSatisfaction = this.getRatingPercentage(this.currentRate)

    projectItem.projectSatisfaction = projectSatisfaction;

    this.isLoading = true;

    this.projectsService.apiProjectsUpdateProjectPut(projectItem).subscribe(
        (data: any) => {
        },
        error => {
          if (error.status == 200) {
            this.modalService.dismissAll();
            this.getProjects();
            this.showSuccess();
          } else {
            console.log(error);
            this.showError();
          }
        },
        () => {
          this.showSuccess();
        }
    );
  }


  openModal(value: any, data: any) {
    this.project = data
    this.modalService.open(value);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  showSuccess() {
    this.toastr.success('Process successfully completed', 'Success', {
      timeOut: 3000,
    });
    this.isLoading = false;
  }

  showError() {
    this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
      timeOut: 3000,
    });
    this.isLoading = false;
  }
}

