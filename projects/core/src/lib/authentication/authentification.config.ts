import { InjectionToken } from '@angular/core';

export const AUTHENTICATION_CONFIGURATION = new InjectionToken<IAuthenticationConfig>('authentication.config');

export interface IAuthenticationConfig {
  url: string;
  resetUrl?:string;
} 