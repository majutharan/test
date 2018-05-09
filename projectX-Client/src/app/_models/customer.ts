import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export class Customer {
  cid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdBy: string;
  createdDate: Date;

}
