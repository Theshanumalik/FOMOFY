import { Document, models, model, Model, Schema, Types } from "mongoose";
import popupSchema, { IPopup } from "./Popup";

enum Theme {
  Classic = "classic",
  Glass = "glass",
  RegularPink = "regular-pink",
  RegularBlue = "regular-blue",
  GradiantClassic = "gradient-classic",
  GradientPink = "gradient-pink",
  GradientBlue = "gradient-blue",
  GradientDark = "gradient-dark",
}
export interface IProject {
  user: Types.ObjectId;
  title: string;
  url: string;
  popups: IPopup[];
  settings: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    delay: number;
    theme: Theme;
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
      delay: {
        type: Number,
        default: 1000,
      },
      theme: {
        type: String,
        enum: [
          "classic",
          "glass",
          "regular-pink",
          "regular-blue",
          "gradient-classic",
          "gradient-pink",
          "gradient-blue",
          "gradient-dark",
        ],
        default: "classic",
      },
    },
  },
  { timestamps: true }
);

const Project: IProjectModel =
  (models.Project as IProjectModel) ||
  model<IProject, IProjectModel>("Project", projectSchema);

export default Project;
