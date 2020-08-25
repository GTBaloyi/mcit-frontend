import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from "./services/auth.guard";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {RequestQuotationComponent} from "./components/request-quotation/request-quotation.component";
import {InvoicesComponent} from "./components/invoices/invoices.component";
import {MakePaymentComponent} from "./components/make-payment/make-payment.component";
import {ViewReceiptsComponent} from "./components/view-receipts/view-receipts.component";
import {ViewQuotationComponent} from "./components/view-quotation/view-quotation.component";
import {CreateQuotationComponent} from "./components/create-quotation/create-quotation.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {ViewQuotationPdfComponent} from "./components/view-quotation-pdf/view-quotation-pdf.component";

const routes: Routes = [
    {
      path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {path: 'dashboard', component: DashboardComponent},
            {path: 'invoice', component: InvoicesComponent},
            {path: 'make-payment', component: MakePaymentComponent},
            {path: 'view-receipts', component: ViewReceiptsComponent},
            {path: 'view-quotation', component: ViewQuotationComponent},
            {path: 'create-quotation', component: CreateQuotationComponent},
            {path: 'projects', component: ProjectsComponent},
            {path: 'view-quotation-pdf', component: ViewQuotationPdfComponent},
        ],
        canActivate: [AuthGuard]
    }
    ,{
        path: 'landing-page', component: LandingPageComponent
    },
    {
      path: 'change-password', component: ChangePasswordComponent
    },
    {
      path: 'forgot-password', component: ForgotPasswordComponent
    },
    {
      path: 'request-quotation', component: RequestQuotationComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
