import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {User} from "../../../models/User";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    private user : User;

    constructor( private router: Router) {
    }



  ngOnInit() {
    this.user  = JSON.parse(sessionStorage.getItem("loginInfo"));

  }


  logout() {
        sessionStorage.removeItem('loginInfo');
        this.router.navigateByUrl('/landing-page');
  }
}
