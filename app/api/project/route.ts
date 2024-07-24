import { getUser } from "@/lib/auth";
import { catchAsyncError, CustomError, CustomResponse } from "@/lib/utils";
import { projectSchema } from "@/lib/zod-schema";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export const POST = catchAsyncError(async (req: NextRequest) => {
  const data = projectSchema.parse(await req.json());

  // LOGIN Check if user is logged in
  const user = await getUser();

  if (!user) {
    throw new CustomError("Authentication required.", 401);
  }

  const project = await Project.create({
    ...data,
    user: user.id,
  });

  const res = new CustomResponse(project, 201, "Project created successfully");

  return NextResponse.json(res, { status: res.statusCode });
});

export const GET = catchAsyncError(async (req: NextRequest) => {
  // LOGIN Check if user is logged in
  const user = await getUser();

  if (!user) {
    throw new CustomError("Authentication required.", 401);
  }

  const projects = await Project.find({ user: user.id });

  const res = new CustomResponse(projects);

  return NextResponse.json(res, { status: res.statusCode });
});

export const PUT = catchAsyncError(async (req: NextRequest) => {
  const searchParams = new URLSearchParams(req.url);
  const data = projectSchema.parse(await req.json());

  const projectId = searchParams.get("id");

  // LOGIN Check if user is logged in
  const user = await getUser();
  if (!user) {
    throw new CustomError("Authentication required.", 401);
  }

  const project = await Project.findOneAndUpdate(
    { _id: projectId, user: user.id },
    { ...data, user: user.id },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw new CustomError("Project not found", 404);
  }

  const res = new CustomResponse(project, 200, "Project updated successfully");

  return NextResponse.json(res, { status: res.statusCode });
});

export const DELETE = catchAsyncError(async (req: NextRequest) => {
  const searchParams = new URLSearchParams(req.url);

  const projectId = searchParams.get("id");

  // LOGIN Check if user is logged in
  const user = await getUser();

  if (!user) {
    throw new CustomError("Authentication required.", 401);
  }

  const project = await Project.findOneAndDelete({
    _id: projectId,
    user: user.id,
  });

  if (!project) {
    throw new CustomError("Project not found", 404);
  }

  const res = new CustomResponse(null, 204, "Project deleted successfully");

  return NextResponse.json(res, { status: res.statusCode });
});
