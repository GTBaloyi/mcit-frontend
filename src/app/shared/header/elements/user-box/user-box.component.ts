import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from "../../../../theme-options";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeRequestModel, EmployeesService, LoginResponseModel} from "../../../../services";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  public user : LoginResponseModel;

  constructor(public globals: ThemeOptions, public router: Router) {
  }

  ngOnInit() {
    this.user  = JSON.parse(sessionStorage.getItem("loginInfo"));
  }

  logout() {
    sessionStorage.removeItem('loginInfo');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userInformation');
    sessionStorage.removeItem('viewQuotation');
    sessionStorage.removeItem('viewInvoice');
    this.router.navigateByUrl('/landing-page');
  }
}
