import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {QueryRef} from "apollo-angular";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {JobsQueryGQL, JobsQueryQuery} from "../graphql/queries.graphql-gen";
import type {Exact, Job} from "../graphql/generated/types.graphql-gen";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  jobs$: Observable<Job[]> | undefined;
  jobsQuery: QueryRef<JobsQueryQuery, Exact<{ [key: string]: never; }>> | undefined;
  readonly #subscriptions: Subscription = new Subscription();
  constructor( private router: Router, private authService: AuthenticationService,
               private jobsQueryGQL:JobsQueryGQL) {
  }

  ngOnInit(): void {
    this.jobsQuery = this.jobsQueryGQL.watch(undefined, {pollInterval: 500});
    this.jobs$ = this.jobsQuery.valueChanges.pipe(map(({ data: {jobs} }: any) => jobs));
  }

  newJob() {
    this.router.navigate(['new-job']);
  }

  async refresh(): Promise<void> {
    await this.jobsQuery?.refetch();
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
