import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';

import { IExceptionConfig, EXCEPTION_CONFIGURATION } from '../exception.config';

@Component({
  selector: "ms-system-not-found",
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  title = 'PAGE NOT FOUND';
  message = 'Requested resource is not available.';
  icon: string;
  constructor(
    private router: Router,
    @Inject(EXCEPTION_CONFIGURATION) private config: IExceptionConfig
  ) { }

  ngOnInit() {
    this.icon = this.config.notFoundIcon;
  }

  goToHome(): void {
    this.router.navigate([this.config.homeUrl]);
  }
}
