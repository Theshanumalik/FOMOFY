import dbConnect from "@/lib/db";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(
  async (req: NextRequest, { params }: { params: { projectId: string } }) => {
    const projectId = params.projectId;

    console.log(params);
    await dbConnect();
    const project = await Project.findById(projectId);

    if (!project) {
      throw new CustomError("404 Page Not found", 404);
    }

    return NextResponse.json(project);
  }
);
