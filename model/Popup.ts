import { Document, Model, Schema, Types } from "mongoose";

export interface IPopup {
  heading: string;
  message: string;
  icon: string;
  timeago: string;
}

export interface IPopupDoc extends IPopup, Document {}

export interface IPopupModel extends Model<IPopupDoc> {}

const popupSchema = new Schema<IPopup, IPopupModel>({
  message: {
    type: String,
    required: true,
  },
  heading: {
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
});

export default popupSchema;
