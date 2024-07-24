import { Document, models, model, Model, Schema, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  plan: "free" | "premium";
  projects: Types.ObjectId[];
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {}

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const User: IUserModel =
  (models.User as IUserModel) || model<IUser, IUserModel>("User", userSchema);

export default User;
