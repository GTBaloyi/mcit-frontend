import { Component, OnInit } from '@angular/core';
import {NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

    title = '';

    showSidebar: boolean = true;
    showNavbar: boolean = true;
    showFooter: boolean = true;
    isLoading: boolean;

    constructor(private router: Router) {

        // Spinner for lazyload modules
        router.events.forEach((event) => {
            if (event instanceof RouteConfigLoadStart) {
                this.isLoading = true;
            } else if (event instanceof RouteConfigLoadEnd) {
                this.isLoading = false;
            }
        });
    }



    ngOnInit() {
        // Scroll to top after route change
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}
