import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../_services/index';
import {User} from "../_models";


@Component({
  templateUrl: 'login.component.html',
  providers: [AuthenticationService],
  styleUrls: ['login.style.css']
})


export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  public alerts: any = [];
  currentUser: User;
 /* public path;*/

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer';
  }

  login() {
    this.loading = true;
    console.log('model');
    console.log(this.model.email);
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          console.log('login response');
          console.log(data);
          if (data.username == null) {
            console.log('mandin');
            this.loadError();
            this.loading = false;
          }else {
            /*this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (this.currentUser.role === 'SUPER_ADMIN') {
              this.path = '/user';
            }else {
              this.path = '/customer';
            }*/
            this.router.navigate([this.returnUrl]);
          }
          /*this.router.navigate([this.returnUrl]);*/
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('error');
          console.log(error);
          if (error.status === 0) {
            this.alerts.push({
              type: 'danger',
              msg: 'Oops! Server Down!. Please try again later.',
              timeout: 2000
            });
          } else {
            this.loadError();
          }
          this.loading = false;
        });
  }

  loadError() {
    this.alerts.push({
      type: 'danger',
      msg: `Login Failed. Username and password is wrong`,
      timeout: 2000
    });

  }
}


