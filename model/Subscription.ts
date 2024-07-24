import { Document, models, model, Model, Schema, Types } from "mongoose";

export interface ISubscription {
  user: Types.ObjectId;
  plan: string; // e.g., 'free', 'basic', 'premium'
  startDate: Date;
  endDate?: Date;
}

export interface ISubscriptionDoc extends ISubscription, Document {}

export interface ISubscriptionModel extends Model<ISubscriptionDoc> {}

const subscriptionSchema = new Schema<ISubscription, ISubscriptionModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Subscription: ISubscriptionModel =
  (models.Subscription as ISubscriptionModel) ||
  model<ISubscription, ISubscriptionModel>("Subscription", subscriptionSchema);

export default Subscription;
