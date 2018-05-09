import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {User} from '../_models/index';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getAll() {
    console.log('man');
    return this.http.get(environment.baseUrl + '/user/alluser', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  getAllRoles(id: number) {
    return this.http.get('/role/allroles/' + id, this.jwt()).map((response: Response) => response.json());
  }


  create(user: User, cid: string) {
    console.log('mandy');
    console.log(cid);
    return this.http.post(environment.baseUrl + '/user/create?cid=' + cid, user, this.jwt())
      .map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.post(environment.baseUrl + '/user/update?uid=' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  deleteUser(id: number) {
    return this.http.delete(environment.baseUrl + '/user/delete?id=' + id).map((response: Response) => response.json());
  }

  view(id: number) {
    console.log('man');
    return this.http.get(environment.baseUrl + '/user/view?id=' + id, this.jwt()).map((response: Response) => response.json());
  }
 /* test(cardNo: string, cvv: string, expiaryDate: string) {
    return this.http.post(environment.baseUrl + '/card/cardAuthenticate', JSON.stringify({cardNo: cardNo, cvv: cvv, expiaryDate: expiaryDate}), this.jwt()).map((response: Response) => response.json());
  }*/


  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    /*const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }*/

    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
