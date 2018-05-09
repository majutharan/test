import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {BsDropdownModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {UsersearchPipe} from './usersearch.pipe';
import {Pipe, PipeTransform} from '@angular/core';
import {UserViewComponent} from './user-view.component';

@NgModule({
  imports: [
    UserRoutingModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule,
  ],
  declarations: [
    UserComponent,
    UsersearchPipe,
    UserViewComponent
  ],
})

export class UserModule {
}
