import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {JobDetailComponent} from "./job-detail/job-detail.component";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {LoginComponent} from "./login/login.component";
import {NewJobComponent} from "./new-job/new-job.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'job-detail', component: JobDetailComponent},
  {path: 'company-detail', component: CompanyDetailComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  {path: 'new-job', component: NewJobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
