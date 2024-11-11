import { Document, Schema } from 'mongoose';
import { model } from 'mongoose';

export interface LikeDocument extends Document {
  user: Schema.Types.ObjectId;
  // comment: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

export const likeSchema = new Schema<LikeDocument>({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  // comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  user: { type: Schema.Types.ObjectId, ref: 'Account', unique: true },
});

export interface CommentDocument extends Document {
  _id: Schema.Types.ObjectId;
  body: string;
  like: LikeDocument[];
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

const commentSchema = new Schema<CommentDocument>({
  _id: { type: Schema.Types.ObjectId },
  body: { required: true, type: String },
  like: [likeSchema],
  user: { type: Schema.Types.ObjectId, ref: 'Account' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

const Comment = model<CommentDocument>('Comment', commentSchema);

export default Comment;
