import {NgModule} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../guards/AuthGuard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
