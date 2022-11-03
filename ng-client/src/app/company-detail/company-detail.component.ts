import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CompanyQueryGQL} from "../graphql/queries.graphql-gen";
import type {Company} from "../graphql/generated/types.graphql-gen";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  company: Company | null | undefined;
  constructor(private activatedRoute: ActivatedRoute, private companyQueryGQL:CompanyQueryGQL) {
  }

  ngOnInit(): void {
    const {companyId} = this.activatedRoute.snapshot.queryParams;

    this.#subscriptions.add(this.companyQueryGQL.watch(
       {id: companyId}
      // @ts-ignore
    ).valueChanges.subscribe(({data: {company}}) => (this.company = company)));
  }

  ngOnDestroy() {
    this.#subscriptions.unsubscribe();
  }

}
