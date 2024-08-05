import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/lib/auth";
import ProjectCard from "../_components/project-card";
import dbConnect from "@/lib/db";
import Project from "@/model/Project";

const Dashboard = async () => {
  const session = await auth();
  await dbConnect();
  const data = await Project.find({ user: session?.user?.id });

  return (
    <div>
      <div className="flex justify-between items-center my-6">
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
        {data.map((project) => (
          <ProjectCard
            key={project._id}
            {...JSON.parse(JSON.stringify(project))}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
