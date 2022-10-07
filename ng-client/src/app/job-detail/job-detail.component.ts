import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {JOB_QUERY} from "../graphql/all-queries";
import {Apollo} from "apollo-angular";
import {Company, Job} from "../graphql/models/jobs.model";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
})
export class JobDetailComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  job: Job | undefined;

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const {jobId} = this.activatedRoute.snapshot.queryParams;
    this.#subscriptions.add(this.apollo.watchQuery<any>({
      query: JOB_QUERY,
      variables: {id: jobId}
    }).valueChanges.subscribe(({data: {job}}) => (this.job = job)));
  }

  async showCompany(company: Company): Promise<void> {
    await this.router.navigate(['company-detail'], {queryParams: {companyId: company.id}});
  }

  ngOnDestroy() {
    this.#subscriptions.unsubscribe();
  }
}
