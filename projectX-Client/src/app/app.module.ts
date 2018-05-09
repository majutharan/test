import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
// Routing Module
import { AppRoutingModule } from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './_services/authentication.service';
/*//Layouts*/
import { FullLayoutComponent } from './layouts/full-layout.component';
import {HttpModule} from '@angular/http';
/*import {HomepageComponent} from './_homepage/homepage.component';*/
/*import {CompanyComponent} from './company/company.component';*/
import {AlertModule } from 'ng2-bootstrap';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';
import {CompanyComponent} from './company/company.component';
import {AuthGuard} from './guards/AuthGuard';
/*
import {AlertComponent} from './_directives/alert.component';
import {AlertService} from './_services/alert.service';
*/

import { PopoverModule } from 'ngx-bootstrap/popover';
import {ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    RegisterComponent,
    SimpleLayoutComponent,
  ],
  providers: [
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
