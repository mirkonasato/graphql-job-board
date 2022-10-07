import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {Apollo, QueryRef} from "apollo-angular";
import {COMPANY_QUERY, JOBS_QUERY} from "../graphql/all-queries";
import {Router} from "@angular/router";
import {Job} from "../graphql/models/jobs.model";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  jobs: Observable<any> | undefined;
  jobsQuery: QueryRef<Job[]>;
  readonly #subscriptions: Subscription = new Subscription();
  constructor(private apollo: Apollo, private router: Router, private authService: AuthenticationService) {
    this.jobsQuery = this.apollo.watchQuery<any>({
      query: JOBS_QUERY,
      // pollInterval: 500, // Update repeat
    });
  }

  ngOnInit(): void {
    this.jobs = this.jobsQuery.valueChanges.pipe(map(({ data: {jobs} }: any) => jobs));

    this.#subscriptions.add(this.apollo
      .watchQuery({
        query: COMPANY_QUERY,
        variables: {id: 'pVbRRBQtMVw6lUAkj1k43'},
      })
      .valueChanges.subscribe(({ data, loading }: any) => {
        console.log('company',data);
        console.log('loading',loading);
      }));
  }

  newJob() {
    this.router.navigate(['new-job']);
  }

  async refresh(): Promise<void> {
    await this.jobsQuery.refetch();
  }

  async showJobDetail(job: any): Promise<void> {
    await this.router.navigate(['job-detail'], {queryParams: {jobId: job.id}});
  }

  get isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  ngOnDestroy() {
    this.#subscriptions.unsubscribe();
  }
}
