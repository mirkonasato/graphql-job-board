import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CREATE_JOB_MUTATION} from "../graphql/all-queries";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnDestroy{
  readonly #subscriptions: Subscription = new Subscription();
  jobForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private apollo: Apollo, private router: Router, private authService: AuthenticationService) {
  }

  createJob(): void {
    if(this.jobForm.valid){
      const {title, description} = this.jobForm.value;
      this.#subscriptions.add(this.apollo.mutate({
        mutation: CREATE_JOB_MUTATION,
        variables: {
          input: {
            title,
            description
          }
        },
        context: {
          headers: {'Authorization': 'Bearer ' + this.authService.getAccessToken()},
        },
      }).subscribe(async (_res) => {
        await this.router.navigate(['']);
      }));
    }
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
