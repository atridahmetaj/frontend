import { CommonsModule } from '@ms-system/commons';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [BreadcrumbComponent, TopbarComponent, MenuComponent, FooterComponent, FullLayoutComponent, SubmenuComponent],
  imports: [
    CommonsModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [BreadcrumbComponent, TopbarComponent, MenuComponent, FooterComponent, FullLayoutComponent, SubmenuComponent],
  providers: [BreadcrumbService, ConfirmationService]
})
export class LayoutModule { }
