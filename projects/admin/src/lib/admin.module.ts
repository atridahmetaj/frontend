import { CommonsModule } from '@ms-system/commons';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { UserCrudComponent } from './users/components/user-crud/user-crud.component';



@NgModule({
  declarations: [AdminComponent, UserListComponent, UserCrudComponent],
  imports: [
    CommonsModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
