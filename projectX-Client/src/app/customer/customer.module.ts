import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {CommonModule} from '@angular/common';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerComponent} from './customer.component';
import {CustomerSearchPipe} from './customer-search.pipe';
import {CustomerService} from '../_services/customer.service';
import {CustomerViewComponent} from './customer-view.component';
 import {AppComponent} from "../app.component";
// import { AlertModule } from 'ngx-alerts';

@NgModule({
  imports: [
    CustomerRoutingModule,
    CollapseModule.forRoot(),
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule,
    ReactiveFormsModule,
   // AlertModule.forRoot({maxMessages: 5, timeout: 5000})
  ],
  declarations: [
    CustomerComponent, CustomerSearchPipe, CustomerViewComponent
  ],
  providers: [CustomerService],
  bootstrap: [ CustomerComponent ]
})

export class CustomerModule {}

