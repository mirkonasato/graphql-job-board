import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {CreateJobMutationGQL} from "../graphql/mutations.graphql-gen";

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  jobForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthenticationService, private createJobMutationGQL: CreateJobMutationGQL) {
  }

  createJob(): void {

    if (this.jobForm.valid) {
      const {title, description} = this.jobForm.value;
      this.#subscriptions.add(this.createJobMutationGQL.mutate({
        input: {
          title,
          description
        }
      }, {
        context: {
          headers: {'Authorization': 'Bearer ' + this.authService.getAccessToken()}
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
