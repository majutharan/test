import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjectComponent} from './project.component';
import {AuthGuard} from '../guards/AuthGuard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'projects'
    },
    component: ProjectComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectRoutingModule {
}
