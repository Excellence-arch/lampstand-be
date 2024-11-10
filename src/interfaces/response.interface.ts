import { Request } from 'express';
import { AccountRole } from '../models/account.model';

export interface DefaultResponse {
  message: string;
}

export interface LoginResponse extends DefaultResponse {
  token: string;
}

export interface IRequest extends Request {
  user: { userId: string; role: AccountRole };
}
