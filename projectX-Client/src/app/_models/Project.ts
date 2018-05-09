import {Company} from './Company';
import {User} from './user';

export class Project {
  pid: number;
  name: string;
  pcid: number;
  cid: string;
  company: Company;
  users: User[];
  projects: Project[];
}
