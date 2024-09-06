import { Driver } from "./driver";
import { Users } from "./users";

export class Operator {
  operatorId: string;
  operatorCode: string;
  name: string;
  mobileNumber: string;
  email: string;
  address: string;
  businessOrgId: string;
  active: boolean;
  vatNumber: string;
  drivers: Driver[];
  user: Users;
}
