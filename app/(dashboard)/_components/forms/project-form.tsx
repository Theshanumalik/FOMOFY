"use client";
import { projectSchema, themes } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

type ProjectForm = z.infer<typeof projectSchema>;

type ProjectFormProps = {
  onSubmit: (data: ProjectForm) => void;
  values?: ProjectForm;
  isSubmitting?: boolean;
};

const ProjectForm = ({ onSubmit, values, isSubmitting }: ProjectFormProps) => {
  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: values?.title || "",
      url: values?.url || "",
      settings: values?.settings || {
        delay: "2000",
        theme: "classic",
        position: "top-right",
      },
    },
  });

  console.log(values);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm">
          Title
        </label>
        <input
          type="text"
          {...form.register("title")}
          placeholder="Enter the name of the project."
          className="border p-2 px-3 rounded-md"
        />
        <span className="text-xs text-red-500">
          {form.formState.errors.title && form.formState.errors.title.message}
        </span>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label htmlFor="url" className="text-sm">
          URL
        </label>
        <input
          type="text"
          {...form.register("url")}
          placeholder="Enter the URL of the project."
          className="border p-2 px-3 rounded-md"
        />
        <span className="text-xs text-red-500">
          {form.formState.errors.url && form.formState.errors.url.message}
        </span>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label htmlFor="settings.backgroundColor" className="text-sm">
          Theme
        </label>
        <select
          {...form.register("settings.theme")}
          className="border p-2 px-3 rounded-md uppercase"
        >
          {themes.map((theme) => (
            <option key={theme} className="uppercase" value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label htmlFor="settings.position" className="text-sm">
          Position
        </label>
        <select
          {...form.register("settings.position")}
          className="border p-2 px-3 rounded-md"
        >
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
        </select>
        <span className="text-xs text-red-500">
          {form.formState.errors.settings?.position &&
            form.formState.errors.settings.position.message}
        </span>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label htmlFor="settings.delayBetweenPopups" className="text-sm">
          Delay between popups
        </label>
        <input
          type="number"
          {...form.register("settings.delay")}
          placeholder="Enter the delay between popups."
          className="border p-2 px-3 rounded-md"
        />
        <span className="text-xs text-red-500">
          {form.formState.errors.settings?.delay?.message &&
            form.formState.errors.settings.delay.message}
        </span>
      </div>

      <button
        type="submit"
        className={cn(
          "btn btn-primary w-full block py-3 px-4 rounded-md mt-4",
          {
            "opacity-50": isSubmitting,
          }
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? "saving..." : "Save"}
      </button>
    </form>
  );
};

export default ProjectForm;
