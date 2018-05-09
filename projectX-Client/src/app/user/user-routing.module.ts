import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/AuthGuard';
import {UserComponent} from './user.component';
import {UserViewComponent} from './user-view.component';
import {User} from '../_models';
import {CustomerComponent} from '../customer/customer.component';

/*let roleCheckUser: User = new User();
let userPath;
roleCheckUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('role checking');
// console.log(roleCheckUser.role);
if (roleCheckUser.role === 'SUPER_ADMIN') {
  userPath = UserComponent;
} else {
  userPath = CustomerComponent;
}*/

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'user'
    },
    component: UserComponent,
   canActivate: [AuthGuard]
  },
  {
    data: {
      title: 'user / view'
    },
    path: 'view/:id',
    component: UserViewComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
