import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: UserLoginComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    UserLoginComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
