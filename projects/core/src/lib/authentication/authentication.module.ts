import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './containers/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { LayoutModule } from '@ms-system/layout';
import { CommonModule } from '@angular/common';
import { CommonsModule } from '@ms-system/commons';

@NgModule({
  imports: [ButtonModule, HttpClientModule, InputTextModule, RouterModule, ReactiveFormsModule, LayoutModule, CommonModule, CommonsModule],
  exports: [LoginComponent],
  declarations: [LoginComponent]
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthenticationService]
    };
  }
}
