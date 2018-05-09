import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {User} from '../_models';

@Injectable()
export class EmailValidator {
currentUser: User;
  debouncer: any;

  constructor() {

  }

  checkEmail(control: FormControl): any {
    console.log('email check service start');

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser.email === control.value) {
          resolve(null);
          console.log('username ok');
        }else {
          resolve({'usernameInUse': true});
          console.log('username no');
        }

      }, 1000);

    });
  }

}
