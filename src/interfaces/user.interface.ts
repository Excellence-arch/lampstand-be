import { AccountRole } from '../models/account.model';

export interface userData {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: AccountRole;
  active: boolean;
}

export interface IUserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: AccountRole;
  password: string;
  active: boolean;
}
