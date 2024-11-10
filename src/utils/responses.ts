import { Schema } from 'mongoose';
import { ContentType, IComment, ILike } from '../interfaces/post.interface';
import { AccountDocument } from '../models/account.model';
import { userData } from '../interfaces/user.interface';

export const postResponse = ({
  _id,
  title,
  body,
  contentType,
  user,
  likes,
  comments,
}: {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: userData;
  likes: ILike[];
  comments: Schema.Types.ObjectId[];
}) => {
  return { id: _id, title, body, contentType, user, likes, comments };
};
