import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {GraphQLModule} from "./graphql/graphql.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { JobDetailComponent } from './job-detail/job-detail.component';
import {MatCardModule} from "@angular/material/card";
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { NewJobComponent } from './new-job/new-job.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobDetailComponent,
    CompanyDetailComponent,
    LoginComponent,
    NewJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
