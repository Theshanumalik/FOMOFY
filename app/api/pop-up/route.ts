import { catchAsyncError } from "@/lib/utils";
import { NextRequest } from "next/server";

export const POST = catchAsyncError(async (req: NextRequest) => {
  const { runAfter, sendMessageEvery, hideAfter } = await req.json();
  // Do something with the data
  return {
    status: 200,
    body: {
      message: "Success",
    },
  };
});
