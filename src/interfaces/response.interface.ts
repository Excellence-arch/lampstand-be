import { Request } from 'express';
import { AccountRole } from '../models/account.model';
import { Schema } from 'mongoose';

export interface DefaultResponse {
  message: string;
}

export interface LoginResponse extends DefaultResponse {
  token: string;
}

export interface IRequest extends Request {
  user: { userId: Schema.Types.ObjectId; role: AccountRole };
}
