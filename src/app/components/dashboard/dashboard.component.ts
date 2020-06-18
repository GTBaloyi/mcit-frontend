import { Component, OnInit, ViewChild } from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    pieChart = [];

    constructor( private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.pieChart = this.dashboardService.pieChart();

    }

}