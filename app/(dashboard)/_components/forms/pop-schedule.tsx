"use client";
import { popUpScheduleSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PopScheduleForm = z.infer<typeof popUpScheduleSchema>;

type PopScheduleProps = {
  onSubmit: (data: PopScheduleForm) => void;
  values: PopScheduleForm;
};

const PopSchedule = ({ onSubmit, values }: PopScheduleProps) => {
  const form = useForm<PopScheduleForm>({
    resolver: zodResolver(popUpScheduleSchema),
    defaultValues: {
      runAfter: values.runAfter,
      sendMessageEvery: values.sendMessageEvery,
      hideAfter: values.hideAfter,
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-96 p-3 rounded-md"
    >
      <label className="form-control mb-2">
        <span className="p-1">Run after</span>
        <input
          {...form.register("runAfter")}
          type="text"
          className="input"
          placeholder="00"
        />
        {form.formState.errors.runAfter && (
          <span className="text-red-500 text-xs">
            {form.formState.errors.runAfter.message}
          </span>
        )}
      </label>

      <label className="form-control mb-2">
        <span className="p-1">Send message every</span>
        <input
          {...form.register("sendMessageEvery")}
          type="text"
          className="input"
          placeholder="00"
        />
        {form.formState.errors.sendMessageEvery && (
          <span className="text-red-500 text-xs">
            {form.formState.errors.sendMessageEvery.message}
          </span>
        )}
      </label>

      <label className="form-control mb-2">
        <span className="p-1">Hide after</span>
        <input
          {...form.register("hideAfter")}
          type="text"
          className="input"
          placeholder="00"
        />
        {form.formState.errors.hideAfter && (
          <span className="text-red-500 text-xs">
            {form.formState.errors.hideAfter.message}
          </span>
        )}
      </label>

      <button type="submit" className="btn btn-accent mt-3">
        Update
      </button>
    </form>
  );
};

export default PopSchedule;
