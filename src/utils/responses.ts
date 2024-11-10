import { Schema } from 'mongoose';
import { ContentType } from '../interfaces/post.interface';
import { AccountDocument } from '../models/account.model';
import { userData } from '../interfaces/user.interface';

export const postResponse = ({
  _id,
  title,
  body,
  contentType,
  user,
}: {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: userData;
}) => {
  return { id: _id, title, body, contentType, user };
};
