import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationActions } from './../../redux/authentication.actions';


@Component({
  selector: 'core-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder, private router: Router,
              private actions: AuthenticationActions) { }

  ngOnInit() {
    sessionStorage.removeItem('token');
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.actions.doLogin(this.form.value);
  }

  resetPassword(): void {
  }

}
