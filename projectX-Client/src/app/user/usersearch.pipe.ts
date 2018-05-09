import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'usersearch'})

export class UsersearchPipe implements PipeTransform {
  transform(users: any, searchText: any): any {
    if (searchText == null) {
      return users;
    }

    return users.filter(function (usersearch) {
      return usersearch.username.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        usersearch.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        usersearch.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        usersearch.role.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}

