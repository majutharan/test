import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    /*console.log('test')*/
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(environment.baseUrl + '/user/authenticate', JSON.stringify({
      username: username,
      password: password
    }), this.jwt())
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private jwt() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
