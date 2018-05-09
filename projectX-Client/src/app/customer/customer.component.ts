import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../_models/customer';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomerService} from '../_services/customer.service';
import {User} from '../_models';
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import {EmailValidator} from '../_services/emailValidator';

@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.style.css'],
  providers: [EmailValidator]
})
export class CustomerComponent implements OnInit {
  model: Customer = new Customer();
  isCreateUser = false;
  isUpdateUser = false;
  isBackUser = false;
  allCustomer: Customer[];
  currentUser: User;
  isCustomerShow = false;
  isCustomerDelete = true;
  checkPhoneNo = true;
  phoneNumber = [];
  public date: Date = new Date();
  public check;
  public checkOk;
  customerAdd = true;
  customerEdit = true;
  form: FormGroup;
  formGroup: FormGroup;
  public alerts: any = [];
  debouncer: any;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private customerServive: CustomerService,
              private formBuilder: FormBuilder,
              private emailValidator: EmailValidator) {
  }

  ngOnInit() {
    console.log('customercomponent');
    this.formValidate();
    this.loadAllCustomer();
    setInterval(() => {
      this.date = new Date();
    }, 1);
    console.log('date');
    this.check = '0' + this.date.getDate() + '-' + '0' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear();
    console.log(this.check.toString());
  }

  formValidate() {
    this.form = this.formBuilder.group({
      'firstName': [null, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      'lastName': [null],
      'email': [null, [Validators.email], this.emailValidator.checkEmail.bind(this.emailValidator)],
      'phoneNumber': [null, [Validators.required]],
    });
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

  patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === '') {
        return null;
      }
      return !regexp.test(value) ? {'patternInvalid': {regexp}} : null;
    };
  }

  ////

  /* isFieldValid(field: string) {
     return !this.form.get(field).valid && this.form.get(field).touched;
   }

   displayFieldCss(field: string) {
     return {
       'has-error': this.isFieldValid(field),
       'has-feedback': this.isFieldValid(field)
     };
   }*/

  onSubmit() {
    /* console.log(this.form);
     if (this.form.valid) {
       console.log('form submitted');
     } else {
       /!*this.validateAllFormFields(this.form);*!/
       console.log('error');
     }*/
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      console.log('error');
      this.loadError();
    } else {
      console.log('success');
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /////

  openAddNewWindow() {
    this.customerAdd = false;
    this.customerEdit = true;
    this.model = new Customer();
    this.staticModal.show();
    this.isCreateUser = false;
    this.isBackUser = false;
    this.isUpdateUser = true;
    console.log('all customers real time');
    console.log(this.allCustomer);
    let i;
    for (i = 0; i < this.allCustomer.length; i++) {
      this.phoneNumber.push({'phoneNumber': this.allCustomer[i].phoneNumber});
    }
    console.log('phone numbers');
    console.log(this.phoneNumber);
  }

  loadAllCustomer() {
    this.customerServive.getAll().subscribe(data => {
      console.log('allcustomers');
      console.log(data);
      this.allCustomer = data;
    });
  }

  registerCustomer() {
    /*console.log('register check');
    console.log(this.check);
    this.checkPhoneNumber();
    console.log(this.checkOk);
    if (this.checkOk === 'notok') {
      console.log('correct');

    }else {
      console.log('this no already registered');
      this.checkPhoneNo = false;
    }*/
    this.checkPhoneNumber();
    console.log(this.checkOk);
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      console.log('error');
      this.loadError();
    }else {
    if (this.checkOk !== 'incorrect') {
      this.model.createdDate = this.check;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.model.createdBy = this.currentUser.firstName;
      this.customerServive.create(this.model).subscribe(data => {
        console.log(data);
        this.loadAllCustomer();
        this.staticModal.hide();
        this.form.reset();
        // this.checkPhoneNumber();
      });
    } else {
      console.log('phone no already exists');
    }}
  }

  updateCustomer(customer: Customer) {
    this.customerEdit = false;
    this.customerAdd = true;
    this.model = customer;
    this.staticModal.show();
    this.isCreateUser = true;
    this.isBackUser = true;
    this.isUpdateUser = false;
  }

  update() {
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      console.log('error');
      this.loadError();
      this.loadAllCustomer();
    }else {
      this.customerServive.update(this.model).subscribe(data => {
      this.staticModal.hide();
      this.form.reset();
      this.loadAllCustomer();
    });
    }
  }

  deleteCustomer(cid: number) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.customerServive.myCustomer(cid).subscribe(data => {
      if (this.currentUser.role === 'SUPER_ADMIN' || this.currentUser.firstName === data.createdBy) {
        this.customerServive.deleteUser(cid).subscribe(() => {
          this.loadAllCustomer();
          this.dangerModal.hide();
        });
      } else {
        this.dangerModal.hide();
        console.log('error delete');
      }
    });
  }

  openCustomerDrop(cid: number) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.customerServive.myCustomer(cid).subscribe(data => {
      if (this.currentUser.role === 'SUPER_ADMIN') {
        this.isCustomerDelete = false;
      }
      if (this.currentUser.role === 'SUPER_ADMIN' || this.currentUser.firstName === data.createdBy) {
        this.isCustomerShow = false;
      } else {
        this.isCustomerShow = true;
        console.log('error delete ppppppppp');
      }
    });
  }

  checkPhoneNumber() {
    for (let x = 0; x < this.phoneNumber.length; x++) {
      console.log(this.phoneNumber[x].phoneNumber);
      if (this.phoneNumber[x].phoneNumber === this.model.phoneNumber) {
        this.checkOk = 'incorrect';
      }
    }
    /*if (this.model.phoneNumber === this.phoneNumber[4].phoneNumber) {
     // this.checkPhoneNo = true;
      console.log(this.model.phoneNumber);
      console.log(this.phoneNumber[x].phoneNumber);
      console.log('phone number is incorrect');
      this.checkOk = 'ok';
    }else {
      console.log('phone number is correct');
     // this.checkPhoneNo = true;
      this.checkOk = 'notok';
    }
  }*/
  }

  userError() {
    this.alerts.push({
      type: 'danger',
      msg: `Fill the required fields`,
      timeout: 1500
    });
  }


  loadError() {
    this.alerts.push({
      type: 'danger',
      msg: `Please fill the required field`,
      timeout: 2000
    });
  }

  closeBtn() {
    this.staticModal.hide();
    this.form.reset();
  }
}

