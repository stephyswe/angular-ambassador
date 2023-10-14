import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../public.component.css']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private authService: AuthService
     ) {
    // You don't need to initialize the form here if you plan to do it in ngOnInit.
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '', 
    });
  }

  submit(): void {
    this.authService.login(this.form.getRawValue())
    .subscribe(() => this.router.navigate(["/"]))
  }
}
