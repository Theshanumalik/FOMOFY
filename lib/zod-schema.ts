import { z } from "zod";

export const popupSchema = z.object({
  heading: z.string().min(3, "Heading must be at least 3 characters long"),
  message: z.string().min(3, "Message must be at least 3 characters long"),
  icon: z.string().url(),
  timeago: z.string(),
});

export const themes: [string, ...string[]] = [
  "classic",
  "glass",
  "regular-pink",
  "regular-blue",
  "gradient-classic",
  "gradient-pink",
  "gradient-blue",
  "gradient-dark",
];

export const projectSchema = z.object({
  user: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  url: z.string().url("Invalid URL"),
  popups: z.array(popupSchema).optional(),
  settings: z.object({
    position: z.string().optional(),
    theme: z.enum(themes).optional(),
    delay: z.string().optional(),
  }),
});
