import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {AuthGuard} from "./services/auth.guard";
import {ClientRegistrationComponent} from "./components/client-registration/client-registration.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";

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
            {path: 'posts', component: PostsComponent}
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
