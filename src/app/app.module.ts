import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DefaultModule} from "./components/default/default.module";
import {BASE_API_URL} from "../ApiModule";
import {environment} from "../environments/environment.prod";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DefaultModule,
        AppRoutingModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule

    ],
    declarations: [
        AppComponent,

    ],
    providers: [
        {provide: BASE_API_URL, useValue: environment.BASE_API_URL}

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
