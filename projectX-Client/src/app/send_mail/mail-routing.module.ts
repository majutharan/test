import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MailComponent} from './mail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Mail'
    },
    component: MailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule {}
