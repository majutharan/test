import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/AuthGuard';
import {ProfileViewComponent} from './profile-view.component';

const routes: Routes = [
  {
    data: {
      title: 'profile'
    },
    path: '',
    component: ProfileViewComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}

