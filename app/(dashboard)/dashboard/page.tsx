import React from "react";
import SiteCard from "../_components/site-card";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/lib/auth";

const Dashboard = async () => {
  const session = await auth();
  const sites = [
    {
      id: 1,
      title: "Google",
      link: "https://google.com",
    },
    {
      id: 2,
      title: "Facebook",
      link: "https://facebook.com",
    },
    {
      id: 3,
      title: "Twitter",
      link: "https://twitter.com",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Hey! {session?.user?.name}</h1>
          <p className="text-gray-500">Here are your projects.</p>
        </div>
        <Link href={"/project/new"} className="btn btn-primary">
          <FaPlus />
          New Project
        </Link>
      </div>
      <div className="flex gap-2 mt-4 flex-wrap">
        {sites.map((site) => (
          <SiteCard
            key={site.id}
            title={site.title}
            link={site.link}
            id={site.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
