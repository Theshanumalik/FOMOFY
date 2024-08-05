import { getUser } from "@/lib/auth";
import { catchAsyncError, CustomError, CustomResponse } from "@/lib/utils";
import { projectSchema } from "@/lib/zod-schema";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/model/Project";
import dbConnect from "@/lib/db";

export const PUT = catchAsyncError(async (req: NextRequest) => {
  const user = await getUser();
  if (!user) {
    throw new CustomError("Authentication required.", 401);
  }

  const { searchParams } = new URL(req.url);

  const data = projectSchema.shape.popups.parse(await req.json());

  const projectId = searchParams.get("projectId");

  await dbConnect();
  const project = await Project.findOne({ _id: projectId, user: user.id });

  if (project && data) {
    project.popups = data;
    await project.save();
    return NextResponse.json(project);
  }

  throw new CustomError("Failed to update project", 400);
});

export const GET = catchAsyncError(async (req: NextRequest) => {
  const user = await getUser();
  if (!user) {
    throw new CustomError("Authentication required.", 401);
  }

  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get("projectId");

  await dbConnect();

  const project = await Project.findOne({
    _id: projectId,
    user: user.id,
  });

  console.log({
    projectId: projectId,
    userId: user.id,
  });

  if (project) {
    const response = new CustomResponse(project);
    return NextResponse.json(response, { status: response.statusCode });
  }

  throw new CustomError("Failed to fetch", 400);
});
