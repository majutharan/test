import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Company} from '../_models/Company';
import {environment} from '../../environments/environment';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {
  }

  create(company: Company) {
    console.log(company);
    return this.http.post(environment.baseUrl + '/company/create', company, this.jwt()).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(environment.baseUrl + '/company/allcompany', this.jwt()).map((response: Response) => response.json());
  }

  deleteCompany(cid: number) {
    return this.http.delete(environment.baseUrl + '/company/delete?cid=' + cid).map((response: Response) => response.json());
  }

  view(cid: number) {
    return this.http.get(environment.baseUrl + '/company/view?cid=' + cid, this.jwt()).map((response: Response) => response.json());
  }

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
