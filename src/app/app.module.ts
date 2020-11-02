import {NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {DefaultModule} from "./components/default/default.module";
import {BASE_API_URL} from "../ApiModule";
import {environment} from "../environments/environment.prod";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LandingPageComponent } from './components/landing-page/landing-page.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        DefaultModule,
        ReactiveFormsModule,
        HttpClientModule,

    ],
    declarations: [
        AppComponent,
        LandingPageComponent,
        MyAccountComponent,
        UpdatePasswordComponent,
    ],
    providers: [
        {provide: BASE_API_URL, useValue: environment.BASE_API_URL},

    ],
    exports: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
