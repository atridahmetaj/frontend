import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './containers/login/login.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  imports: [ButtonModule, HttpClientModule, InputTextModule, RouterModule, ReactiveFormsModule],
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
