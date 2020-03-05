import { InjectionToken } from '@angular/core';

export const MENU_CONFIGURATION = new InjectionToken<IMenuConfig>('menu.config');

export interface IMenuConfig {
  items?: any[];
}  
 