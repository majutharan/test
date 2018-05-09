import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'companysearch'})

export class CompanySearchPipe implements PipeTransform {
  transform(company: any, searchText: any): any {
    if (searchText == null) {
      return company;
    }

    return company.filter(function (companysearch) {
      return companysearch.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        companysearch.street.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        companysearch.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        companysearch.postalcode.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        companysearch.country.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}
