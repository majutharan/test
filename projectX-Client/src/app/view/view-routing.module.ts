import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ViewComponent} from './view.component';
import {AuthGuard} from '../guards/AuthGuard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'view'
    },
    component: ViewComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {}
