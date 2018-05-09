import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { BsDropdownModule } from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileViewComponent} from './profile-view.component';

@NgModule({
  imports: [
    ProfileRoutingModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule,
  ],
  declarations: [
    ProfileViewComponent
  ],
})

export class ProfileModule {
}
