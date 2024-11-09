import { Schema } from 'mongoose';
import { AccountDocument } from '../models/account.model';

export enum ContentType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export interface IPost {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: AccountDocument;
}
