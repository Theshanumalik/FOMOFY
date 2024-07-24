import { z } from "zod";

export const popupSchema = z.object({
  heading: z.string().min(3, "Heading must be at least 3 characters long"),
  message: z.string().min(3, "Message must be at least 3 characters long"),
  redirectUrl: z.string().url("Invalid URL").optional(),
  icon: z.string().url().optional(),
  timeago: z.string(),
});

export const projectSchema = z.object({
  user: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  url: z.string().url("Invalid URL"),
  popups: z.array(z.string()).optional(),
  settings: z.object({
    position: z.string().optional(),
    backgroundColor: z.string().optional(),
    delayBetweenPopups: z.number().optional(),
    delayBeforeFirstPopup: z.number().optional(),
    delayBeforeRemovingPopup: z.number().optional(),
  }),
});
