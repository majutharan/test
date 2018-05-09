import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';
import {User} from "./_models";
/*import {CompanyComponent} from './company/company.component';*/

/*let roleCheck: User = new User();
let userPath;
let childrenPath;
roleCheck = JSON.parse(localStorage.getItem('currentUser'));
console.log('role checking');
console.log(roleCheck.role);
if (!localStorage || roleCheck.role === 'SUPER_ADMIN') {
  userPath = 'user';
  childrenPath = './user/user.module#UserModule';
} else {
  userPath = 'customer';
  childrenPath = './customer/customer.module#CustomerModule';
}
console.log(userPath);
console.log(childrenPath);*/


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'company',
        loadChildren: './company/company.module#CompanyModule',
      },
      {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule'
      },
      {
        path: 'profileView',
        loadChildren: './layouts/profile.module#ProfileModule'
      },
      {
        path: 'mail',
        loadChildren: './send_mail/mail.module#MailModule'
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
