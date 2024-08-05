"use client";
import { projectSchema } from "@/lib/zod-schema";
import Link from "next/link";
import React from "react";
import { FaGlobe, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { z } from "zod";

type ProjctProps = z.infer<typeof projectSchema> & { _id: string };

const ProjectCard = ({ title, _id, url }: ProjctProps) => {
  return (
    <div className="card w-72 bg-base-100 shadow flex-row items-center py-5 px-6 justify-between">
      <Link href={"/project/manage/" + _id} passHref className="flex-1">
        <div className="card-body p-0">
          <h2 className="card-title text-base">{title}</h2>
          <p className="text-xs flex items-center gap-1">
            <FaGlobe />
            {formatUrl(url)}
          </p>
        </div>
      </Link>
      <div>
        <button onClick={() => alert("HElo")}>
          <FaGear />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

// Function that formats URL by removing https:// and www.
function formatUrl(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
}
