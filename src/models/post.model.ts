import { Document, Schema } from 'mongoose';
import { ContentType, ILike } from '../interfaces/post.interface';
import { model } from 'mongoose';
import { LikeDocument, likeSchema } from './comment.model';

export interface PostDocument extends Document {
  title: string;
  body: string;
  contentType: ContentType;
  user: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
  likes: LikeDocument[];
  category: string[];
  slug: string
}

const postSchema = new Schema<PostDocument>(
  {
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
    category: [{ type: String }],
    slug: { type: String, uniques: true, required: true },
  },
  { timestamps: true }
);

const Post = model<PostDocument>('Post', postSchema);

export default Post;
