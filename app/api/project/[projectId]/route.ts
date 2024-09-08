import { getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { catchAsyncError, CustomError, CustomResponse } from "@/lib/utils";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(
  async (req: NextRequest, { params }: { params: { projectId: string } }) => {
    const user = await getUser();

    if (!user) {
      throw new CustomError("Authentication required.", 401);
    }
    console.log(params.projectId);

    await dbConnect();
    const project = await Project.findOne({
      _id: params.projectId,
      user: user.id,
    }).select("-popups");

    if (!project) {
      throw new CustomError("Project not found.", 404);
    }

    const res = new CustomResponse(
      project,
      200,
      "Project fetched successfully."
    );

    return NextResponse.json(res, { status: res.statusCode });
  }
);
