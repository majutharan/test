import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Project} from '../_models/Project';
import {environment} from '../../environments/environment';

@Injectable()
export class ProjectService {

  constructor(private http: Http) {
  }

  create(project: Project, cid: string) {
    console.log(project);
    console.log(cid);
    return this.http.post(environment.baseUrl + '/project/create?cid=' + cid, project, this.jwt()).map((response: Response) => response.json());
  }

  update(project: Project) {
    console.log(project);
    return this.http.post(environment.baseUrl + '/project/update?pid=' + project.pid,
      project, this.jwt()).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(environment.baseUrl + '/project/allproject', this.jwt()).map((response: Response) => response.json());
  }

  deleteProject(pid: number) {
    console.log(Project);
    return this.http.delete(environment.baseUrl + '/project/delete?pid=' + pid).map((response: Response) => response.json());
  }

  assignUser(users: any, id: string) {
    return this.http.post(environment.baseUrl + '/project/assign?id=' + id, users, this.jwt()).map((response: Response) => response.json());
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
