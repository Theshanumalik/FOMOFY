"use client";
import Link from "next/link";
import React from "react";
import { FaGlobe, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

type SiteCardProps = {
  title: string;
  link: string;
  id: number;
};

const SiteCard = ({ title, link, id }: SiteCardProps) => {
  return (
    <div className="card w-72 bg-base-100 shadow flex-row items-center py-5 px-6 justify-between">
      <Link href={"/project/" + id} passHref className="flex-1">
        <div className="card-body p-0">
          <h2 className="card-title text-base">{title}</h2>
          <p className="text-xs flex items-center gap-1">
            <FaGlobe />
            {formatUrl(link)}
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

export default SiteCard;

// Function that formats URL by removing https:// and www.
function formatUrl(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
}
