import {NgModule} from '@angular/core';
import {ViewComponent} from './view.component';
import {ViewRoutingModule} from './view-routing.module';

@NgModule({
  imports: [
    ViewRoutingModule,
  ],
  declarations: [
    ViewComponent
  ]
})

export class ViewModule {}
