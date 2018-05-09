import {Project} from './Project';
import {User} from './user';

export class Company {
  cid: number;
  name: string;
  street: string;
  city: string;
  postalcode: string;
  country = 'Sri Lanka';
  projects: Project[];
  company: Company[];
  users: User[];
}
