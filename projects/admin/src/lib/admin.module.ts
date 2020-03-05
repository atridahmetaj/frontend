import { CommonsModule } from '@ms-system/commons';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonsModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
