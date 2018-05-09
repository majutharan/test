import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/AuthGuard';
import {CustomerComponent} from './customer.component';
import {CustomerViewComponent} from './customer-view.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'customer'
    },
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:cid',
    data: {
      title: 'Customer / view'
    },
    component: CustomerViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule {
}
