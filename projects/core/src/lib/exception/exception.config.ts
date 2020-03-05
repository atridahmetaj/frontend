import { InjectionToken } from '@angular/core';

export const EXCEPTION_CONFIGURATION = new InjectionToken<IExceptionConfig>('exception.config');

export interface IExceptionConfig {
    homeUrl?: string;
    errorIcon?: string;
    notFoundIcon?: string; 
} 