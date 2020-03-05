import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { IExceptionConfig, EXCEPTION_CONFIGURATION } from '../exception.config';

@Component({
  selector: 'ms-system-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  title = 'ERROR OCCURED';
  message = 'Something went wrong.';
  icon: string;
  constructor(
    private router: Router,
    @Inject(EXCEPTION_CONFIGURATION) private config: IExceptionConfig
  ) {}

  ngOnInit() {
    this.icon = this.config.errorIcon;
  }

  goToHome() {
    this.router.navigate([this.config.homeUrl]);
  }
}
