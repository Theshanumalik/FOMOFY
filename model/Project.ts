import { Document, models, model, Model, Schema, Types } from "mongoose";

export interface IProject {
  user: Types.ObjectId;
  title: string;
  url: string;
  popups: Types.ObjectId[];
  settings: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    backgroundColor: string;
    delayBetweenPopups: number;
    delayBeforeFirstPopup: number;
    delayBeforeRemovingPopup: number;
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
    popups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Popup",
      },
    ],
    settings: {
      position: {
        type: String,
        enum: ["top-left", "top-right", "bottom-left", "bottom-right"],
        default: "top-right",
      },
      backgroundColor: {
        type: String,
        default: "#ffffff",
      },
      delayBetweenPopups: {
        type: Number,
        default: 0,
      },
      delayBeforeFirstPopup: {
        type: Number,
        default: 0,
      },
      delayBeforeRemovingPopup: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Project: IProjectModel =
  (models.Project as IProjectModel) ||
  model<IProject, IProjectModel>("Project", projectSchema);

export default Project;
