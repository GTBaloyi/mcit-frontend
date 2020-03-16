import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {PostsComponent} from "../posts/posts.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DashboardService} from "../../services/dashboard.service";
import {UserLoginComponent} from "../user-login/user-login.component";
import {ClientRegistrationComponent} from "../client-registration/client-registration.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {StatModule} from "../../shared/widgets/stat/stat.module";

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    UserLoginComponent,
    ClientRegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    StatModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
