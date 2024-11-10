import { Schema } from 'mongoose';
import { AccountDocument } from '../models/account.model';
import { userData } from './user.interface';

export enum ContentType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export interface IPost {
  id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: userData;
}
