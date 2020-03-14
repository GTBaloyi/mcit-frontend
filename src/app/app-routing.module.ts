import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {AuthGuard} from "./services/auth.guard";
import {ClientRegistrationComponent} from "./components/client-registration/client-registration.component";

const routes: Routes = [
    {
      path: '',
        component: DefaultComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'posts', component: PostsComponent}
        ],
        canActivate: [AuthGuard]
    },
    {
      path: 'login',
        component: UserLoginComponent
    },
    {
      path: 'register', component: ClientRegistrationComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
