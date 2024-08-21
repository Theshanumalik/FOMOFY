"use client";
import ProjectForm from "../../_components/forms/project-form";
import { z } from "zod";
import { projectSchema } from "@/lib/zod-schema";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewProjectPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (data: z.infer<typeof projectSchema>) => {
    const promise = new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .post("/api/project", data)
        .then((res) => {
          setLoading(false);
          resolve(res);
          router.push("/dashboard/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          reject(err);
        });
    });
    toast.promise(promise, {
      loading: "Creating project...",
      success: "Project created successfully.",
      error: "An error occurred while creating the project.",
    });
  };
  return (
    <main className="max-w-xl mx-auto my-4 bg-white shadow-md rounded-md border p-5 py-8">
      <div className="mb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          Create New Project
        </h3>
      </div>
      <ProjectForm onSubmit={handleSubmit} isSubmitting={loading} />
    </main>
  );
};

export default NewProjectPage;
