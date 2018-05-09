import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customersearch'})

export class CustomerSearchPipe implements PipeTransform {
  transform(customer: any, searchText: any): any {
    if (searchText == null) {
      return customer;
    }

    return customer.filter(function (customersearch) {
      return customersearch.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        customersearch.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        customersearch.createdBy.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}
