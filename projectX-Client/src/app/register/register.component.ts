import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../_services/index';
import {User} from '../_models/user';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.style.css'],
  providers: [UserService],
  selector: 'register-form'
})


export class RegisterComponent {
  model: any = {};
  loading = false;
  public alerts: any = [];

  constructor(private router: Router,
              private userService: UserService) {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model, '')
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          /*this.router.navigate(['/login']);*/
          this.add();
          // this.model = new User();
        },
        error => {
          if (error.status === 500) {
            this.alerts.push({
              type: 'danger',
              msg: `Internal Error occurred!`,
              timeout: 5000
            });
          }
          this.loading = false;
        });
  }

  add() {
    this.alerts.push({
      type: 'info',
      msg: `Registration Successfull`,
      timeout: 5000
    });
  }

  public back(): void {
    this.router.navigate(['/login']);
  }
}
