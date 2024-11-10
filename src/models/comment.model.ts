import { Document, Schema } from 'mongoose';
import { model } from 'mongoose';

export interface LikeDocument extends Document {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

const likeSchema = new Schema<LikeDocument>({
  _id: { type: Schema.Types.ObjectId },
  user: { type: Schema.Types.ObjectId, ref: 'Account', unique: true },
});

export interface CommentDocument extends Document {
  _id: Schema.Types.ObjectId;
  body: string;
  like: LikeDocument[];
  user: Schema.Types.ObjectId;
}

const commentSchema = new Schema<CommentDocument>({
  _id: { type: Schema.Types.ObjectId },
  body: { required: true, type: String },
  like: [likeSchema],
  user: { type: Schema.Types.ObjectId, ref: 'Account' },
});

const Comment = model<CommentDocument>('Comment', commentSchema);

export default Comment;
