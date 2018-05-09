import {NgModule} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {AlertModule, BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MailComponent} from './mail.component';
import {MailRoutingModule} from './mail-routing.module';
import {TextInputAutocompleteModule} from 'angular-text-input-autocomplete';
import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';


keyboardEventKeyPolyfill();
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule,
    MailRoutingModule,
    TextInputAutocompleteModule
  ],
  declarations: [MailComponent]
})
export class MailModule {
}
