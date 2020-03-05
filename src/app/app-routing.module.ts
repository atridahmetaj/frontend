
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, AuthGuard, NotFoundComponent } from '@ms-system/core';
import { AdminComponent } from '@ms-system/admin';
import { FullLayoutComponent } from '@ms-system/layout';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'ms',
    component: FullLayoutComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  },
 {
   path: '**',
   component: NotFoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
