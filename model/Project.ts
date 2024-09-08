import { Document, models, model, Model, Schema, Types } from "mongoose";
import popupSchema, { IPopup } from "./Popup";

export interface IProject {
  user: Types.ObjectId;
  title: string;
  url: string;
  popups: IPopup[];
  settings: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    backgroundColor: string;
    delayBetweenPopups: number;
    textColor: string;
  };
}

export interface IProjectDoc extends IProject, Document {}

export interface IProjectModel extends Model<IProjectDoc> {}

const projectSchema = new Schema<IProject, IProjectModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    popups: {
      type: [popupSchema],
      maxlength: 10,
      default: [],
    },
    settings: {
      position: {
        type: String,
        enum: ["top-left", "top-right", "bottom-left", "bottom-right"],
        default: "top-right",
      },
      backgroundColor: {
        type: String,
        default: "#fff",
      },
      delayBetweenPopups: {
        type: Number,
        default: 2000,
      },
      textColor: {
        type: String,
        default: "#000",
      },
    },
  },
  { timestamps: true }
);

const Project: IProjectModel =
  (models.Project as IProjectModel) ||
  model<IProject, IProjectModel>("Project", projectSchema);

export default Project;
