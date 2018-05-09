import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PopoverModule } from 'ngx-bootstrap/popover';
import {ModalModule, BsDropdownModule} from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    DropdownModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
