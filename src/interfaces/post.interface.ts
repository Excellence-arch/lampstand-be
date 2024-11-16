import { Schema } from 'mongoose';
import { AccountDocument } from '../models/account.model';
import { IUserData, userData } from './user.interface';

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
  comments: Schema.Types.ObjectId[];
  likes: ILike[];
  category: string[];
  slug: string;
}

export interface IPostDoc {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: userData;
  likes: ILike[];
  comments: Schema.Types.ObjectId[];
  category: string[];
  slug: string;
}

export interface IPostFull {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: userData;
  likes: ILike[];
  comments: IComment[];
  category: string[];
  slug: string;
}

export interface ILike {
  user: userData;
  post: Schema.Types.ObjectId;
}

export interface IComment {
  _id: Schema.Types.ObjectId;
  body: string;
  like: ILike;
  user: userData;
  post: Schema.Types.ObjectId;
}
