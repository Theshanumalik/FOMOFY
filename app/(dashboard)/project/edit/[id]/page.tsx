"use client";
import ProjectForm from "@/app/(dashboard)/_components/forms/project-form";
import Loader from "@/app/(dashboard)/_components/loader";
import { projectSchema } from "@/lib/zod-schema";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const EditProjectPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<z.infer<typeof projectSchema>>();
  const [fetchingProject, setFetchingProject] = useState(true);

  const handleSubmit = (data: z.infer<typeof projectSchema>) => {
    const promise = new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .put("/api/project", data, {
          params: { id: params.id },
        })
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
      loading: "Updating project...",
      success: "Project updated successfully.",
      error: "An error occurred while updating the project.",
    });
  };

  useEffect(() => {
    axios
      .get("/api/project/" + params.id)
      .then((res) => {
        setProject(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetchingProject(false);
      });
  }, [params.id]);

  if (fetchingProject) {
    return (
      <main className="flex justify-center items-center h-screen">
        <Loader />
      </main>
    );
  }
  return (
    <main className="max-w-xl mx-auto my-4 bg-white shadow-md rounded-md border p-5 py-8">
      <div className="mb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          Edit Project
        </h3>
      </div>
      <ProjectForm
        onSubmit={handleSubmit}
        values={project}
        isSubmitting={loading}
      />
    </main>
  );
};

export default EditProjectPage;
