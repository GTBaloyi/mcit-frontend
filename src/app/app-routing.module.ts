import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {AuthGuard} from "./services/auth.guard";
import {ClientRegistrationComponent} from "./components/client-registration/client-registration.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {ProfileComponent} from "./components/clients/profile/profile.component";

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
            {path: 'clients', component: ClientsComponent},
            {path: 'profile', component: ProfileComponent}
        ],
        canActivate: [AuthGuard]
    }
    ,{
        path: 'landing-page',
        component: LandingPageComponent
    },
    {
      path: 'login',
        component: UserLoginComponent
    },
    {
      path: 'register', component: ClientRegistrationComponent
    },
    {
      path: 'password-reset', component: PasswordResetComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
