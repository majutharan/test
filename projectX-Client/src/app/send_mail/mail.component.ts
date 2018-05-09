import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Customer} from '../_models/customer';
import {CustomerService} from '../_services/customer.service';

@Component({
  templateUrl: 'mail.component.html',
  styleUrls: ['mail.component.css'],
  providers: [CustomerService]
})
export class MailComponent implements OnInit {
  model: Customer = new Customer();
  allCustomer: Customer[];
  public customerEmail = [];
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private customerService: CustomerService) {}
  ngOnInit() {
    console.log('email');
    this.loadAllCustomer();
    console.log('email');
    console.log(this.customerEmail);
    this.findChoices1('', this.customerEmail);
  }
  loadAllCustomer() {
    this.customerService.getAll().subscribe(data => {
      console.log('allcustomers');
      console.log(data);
      this.allCustomer = data;
      this.sendMail();
    });
  }
  openAddNewWindow() {
    this.staticModal.show();
    console.log('email add new window');
    console.log(this.customerEmail);
  }
  sendMail() {
    /*let i;
    for (i = 0; i < this.allCustomer.length; i++) {
      this.customerEmail.push({'email': this.allCustomer[i].phoneNumber});
    }*/
    for (let i = 0; i < this.allCustomer.length; i++) {
      this.customerEmail.push(this.allCustomer[i].email);
    }
  }
  findChoices1(searchText: string, customer) {
    console.log('findChoice');
    console.log('find customer details');

    console.log(customer);
     // return customer.filter(item => item.toLowerCase().includes(searchText.toLowerCase()));
  }

  getChoiceLabel(choice: string) {
    console.log('choice');
    return `@${choice} `;
  }
}
