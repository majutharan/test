import {Component, OnInit} from '@angular/core';
import {Customer} from '../_models/customer';
import {CustomerService} from '../_services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jsPDF from 'jspdf';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  model: Customer = new Customer();

  constructor(private customerServive: CustomerService,
              private router: Router,
              private route: ActivatedRoute,
              private _location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cid = +params['cid']; // (+) converts string 'id' to a number
      console.log('Id..........' + cid);
      this.customerServive.view(cid)
        .subscribe(
          data => {
            console.log('all_company');
            console.log(data);
            this.model = data;

          });
      // In a real app: dispatch action to load the details here.
    });
  }

  download() {
    console.log('Download.....');
    const elementToPrint = document.getElementById('view-container');
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save('application.pdf');
    });
  }
  backLoc() {
    this._location.back();
  }
}
