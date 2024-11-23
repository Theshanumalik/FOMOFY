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

    const response = new NextResponse(JSON.stringify({ project }));
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }
);
