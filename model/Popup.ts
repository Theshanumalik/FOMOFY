import { Document, models, model, Model, Schema, Types } from "mongoose";

export interface IPopup {
  user: Types.ObjectId;
  heading: string;
  message: string;
  redirectUrl: string;
  icon: string;
  timeago: string;
  project: Types.ObjectId;
}

export interface IPopupDoc extends IPopup, Document {}

export interface IPopupModel extends Model<IPopupDoc> {}

const popupSchema = new Schema<IPopup, IPopupModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    timeago: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const Popup: IPopupModel =
  (models.Popup as IPopupModel) ||
  model<IPopup, IPopupModel>("Popup", popupSchema);

export default Popup;
