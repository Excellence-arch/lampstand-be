import { Document, Schema } from 'mongoose';
import { ContentType, ILike } from '../interfaces/post.interface';
import { model } from 'mongoose';
import { likeSchema } from './comment.model';

export interface PostDocument extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
  likes: ILike[];
}

const postSchema = new Schema<PostDocument>({
  _id: { type: Schema.Types.ObjectId },
  title: { required: true, type: String },
  body: { required: true, type: String },
  contentType: {
    required: true,
    enum: Object.values(ContentType),
    default: ContentType.ARTICLE,
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'Account' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [likeSchema],
});

const Post = model<PostDocument>('Post', postSchema);

export default Post;
