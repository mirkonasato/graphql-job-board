import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {JobQueryGQL} from "../graphql/queries.graphql-gen";
import type {Company, Job} from "../graphql/generated/types.graphql-gen";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
})
export class JobDetailComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  job: Job | null | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private jobQuery:JobQueryGQL) {
  }

  ngOnInit(): void {
    const {jobId} = this.activatedRoute.snapshot.queryParams;
    this.#subscriptions.add(this.jobQuery.watch({id: jobId}).valueChanges.subscribe(({data: {job}}) => (this.job = job)));
  }

  async showCompany(company: Company): Promise<void> {
    await this.router.navigate(['company-detail'], {queryParams: {companyId: company.id}});
  }

  ngOnDestroy() {
    this.#subscriptions.unsubscribe();
  }
}
