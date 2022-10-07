import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Company} from "../graphql/models/jobs.model";
import {Apollo} from "apollo-angular";
import {ActivatedRoute} from "@angular/router";
import {COMPANY_QUERY} from "../graphql/all-queries";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  company: Company | undefined;

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const {companyId} = this.activatedRoute.snapshot.queryParams;
    this.#subscriptions.add(this.apollo.watchQuery<any>({
      query: COMPANY_QUERY,
      variables: {id: companyId}
    }).valueChanges.subscribe(({data: {company}}) => (this.company = company)));
  }

  ngOnDestroy() {
    this.#subscriptions.unsubscribe();
  }

}
