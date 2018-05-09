import {Project} from './Project';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  projects: Project[];
  roleId: string;
  rolename: string;
  role: string;
  gender: string;
  bod: Date;

}
