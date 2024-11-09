import { Document, Schema } from 'mongoose';
import { ContentType } from '../interfaces/post.interface';
import { model } from 'mongoose';

export interface PostDocument extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  body: string;
  contentType: ContentType;
  user: Schema.Types.ObjectId;
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
});

const Post = model<PostDocument>('Post', postSchema);

export default Post;
