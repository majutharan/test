import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyComponent} from './company.component';
import {AuthGuard} from '../guards/AuthGuard';
import {CompanyViewComponent} from './company-view.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'company'
    },
    component: CompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    data: {
      title: 'company / view'
    },
    path: 'view/:cid',
    component: CompanyViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyRoutingModule {
}
