import {NgModule} from '@angular/core';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectComponent} from './project.component';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {ProjectSearchPipe} from './project-search.pipe';


@NgModule({
  imports: [
    ProjectRoutingModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule
  ],
  declarations: [
    ProjectComponent, ProjectSearchPipe
  ]
})
export class ProjectModule {
}
