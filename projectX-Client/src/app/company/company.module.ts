import {NgModule} from '@angular/core';
import {CompanyRoutingModule} from './company-routing.module';
import {CompanyComponent} from './company.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {CompanyService} from '../_services/company.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {BsDropdownModule} from 'ngx-bootstrap';
import {CompanyViewComponent} from './company-view.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {UsersearchPipe} from '../user/usersearch.pipe';
import {CompanySearchPipe} from './company-search.pipe';
import {Ng2Permission} from 'angular2-permission/dist';


@NgModule({
  imports: [
    CompanyRoutingModule,
    CollapseModule.forRoot(),
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule,
  ],
  declarations: [
    CompanyComponent, CompanyViewComponent, CompanySearchPipe
  ],
  providers: [CompanyService]
})
export class CompanyModule {
}
