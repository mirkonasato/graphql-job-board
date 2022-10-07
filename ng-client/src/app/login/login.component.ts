import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private authService: AuthenticationService, private router: Router) { }

  async login(): Promise<void>{
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value;
      this.authService.login(email,password).subscribe(() => this.router.navigate(['']));
    }
  }

}
