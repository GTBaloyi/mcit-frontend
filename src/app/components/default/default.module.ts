import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {DashboardService} from "../../services/dashboard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FooterComponent} from "../../shared/footer/footer.component";
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";
import {SpinnerComponent} from "../../shared/spinner/spinner.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ChartsModule} from "ng2-charts";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {ToastrModule } from 'ngx-toastr';
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {RequestQuotationComponent} from "../request-quotation/request-quotation.component";
import {InvoicesComponent} from "../invoices/invoices.component";
import {ViewReceiptsComponent} from "../view-receipts/view-receipts.component";
import {CreateQuotationComponent} from "../create-quotation/create-quotation.component";
import {ViewQuotationComponent} from "../view-quotation/view-quotation.component";
import {ProjectsComponent} from "../projects/projects.component";
import {ViewQuotationPdfComponent} from "../view-quotation-pdf/view-quotation-pdf.component";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {RegisterComponent} from "../register/register.component";
import {UserBoxComponent} from "../../shared/header/elements/user-box/user-box.component";
import {HeaderComponent} from "../../shared/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NgReduxModule} from "@angular-redux/store";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {PageTitleComponent} from "../../shared/page-title/page-title.component";
import {ConfigActions} from "../../ThemeOptions/store/config.actions";
import {ViewInvoicePdfComponent} from "../view-invoice-pdf/view-invoice-pdf.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";


@NgModule({
  declarations: [
      DefaultComponent,
      DashboardComponent,
      NavbarComponent,
      SidebarComponent,
      FooterComponent,
      DashboardComponent,
      SpinnerComponent,
      ForgotPasswordComponent,
      ChangePasswordComponent,
      RequestQuotationComponent,
      InvoicesComponent,
      ViewReceiptsComponent,
      CreateQuotationComponent,
      ViewQuotationComponent,
      ProjectsComponent,
      ViewQuotationPdfComponent,
      RegisterComponent,
      UserBoxComponent,
      HeaderComponent,
      PageTitleComponent,
      ViewInvoicePdfComponent,
      ProjectDetailsComponent

  ],
    imports: [

        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ChartsModule,
        ToastrModule.forRoot(),
        FormsModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        NgReduxModule,
        LoadingBarRouterModule,
        PerfectScrollbarModule,
        AngularFontAwesomeModule,
        HttpClientModule
    ],
  exports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      RouterModule,
      SharedModule,
      BrowserAnimationsModule,
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      ChartsModule,
      ToastrModule,
      Ng2SearchPipeModule,
      PageTitleComponent,
  ],
  providers: [
      ConfigActions,
      DashboardService
  ]
})
export class DefaultModule { }
