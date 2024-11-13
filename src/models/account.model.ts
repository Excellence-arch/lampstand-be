import { Schema, model, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export enum AccountRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface AccountDocument extends Document {
  name: string;
  role: AccountRole;
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  username: string;
  verified: boolean;
  avatar: string;
  active: boolean;
}

const AccountSchema = new Schema<AccountDocument>(
  {
    role: {
      type: String,
      enum: Object.values(AccountRole),
      required: true,
      default: AccountRole.USER,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, unique: false },
    verified: { type: Boolean, default: false, required: false },
    avatar: {
      type: String,
      default:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-avatar&psig=AOvVaw2YzInNXECqLHH5s78nJbjy&ust=1731618387889000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjo26qb2okDFQAAAAAdAAAAABAE',
      required: false,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AccountSchema.pre('save', async function (next) {
  const account = this as AccountDocument;

  // Only hash the password if it has been modified (or is new)
  if (!account.isModified('password')) return next();

  try {
    const saltRounds = 10;
    account.password = await bcrypt.hash(account.password, saltRounds);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

// Add a method to compare passwords for login
AccountSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Account = model<AccountDocument>('Account', AccountSchema);

export default Account;
