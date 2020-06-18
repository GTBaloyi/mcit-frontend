import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DashboardService} from "../../services/dashboard.service";
import {UserDialogComponent, UserLoginComponent} from "../user-login/user-login.component";
import {ClientRegistrationComponent} from "../client-registration/client-registration.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {StatModule} from "../../shared/widgets/stat/stat.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFabMenuModule} from "@angular-material-extensions/fab-menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from "@angular/material/tabs";
import {MatPasswordStrengthModule} from "@angular-material-extensions/password-strength";
import {PasswordResetComponent} from "../password-reset/password-reset.component";
import {InvoiceComponent} from "../invoice/invoice.component";
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
      DefaultComponent,
      DashboardComponent,
      UserLoginComponent,
      UserDialogComponent,
      ClientRegistrationComponent,
      PasswordResetComponent,
      InvoiceComponent,
],
  imports: [
      MatDialogModule,
      MatAutocompleteModule,
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
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatFabMenuModule,
      BrowserAnimationsModule,
      MatProgressBarModule,
      MatSnackBarModule,
      MatDialogModule,
      MatTabsModule,
      FlexLayoutModule.withConfig({addFlexToParent: false}),
      MatPasswordStrengthModule.forRoot()
  ],
  exports: [
      MatDialogModule,
      MatAutocompleteModule,
      MatFabMenuModule,
      ReactiveFormsModule,
      FormsModule,
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
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatProgressBarModule,
      MatSnackBarModule,
      MatDialogModule,
      MatTabsModule,

  ],
  providers: [
      DashboardService
  ]
})
export class DefaultModule { }
