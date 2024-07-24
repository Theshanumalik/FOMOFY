import { NextRequest, NextResponse } from "next/server";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function catchAsyncError(
  fun: (req: NextRequest, ...others: any[]) => Promise<any>
) {
  return async (req: NextRequest, ...others: any[]) => {
    try {
      return await fun(req, ...others);
    } catch (error: any) {
      // Handle custom error
      if (error instanceof CustomError) {
        return NextResponse.json(error.message, {
          status: error.statusCode,
        });
      }
      // Handle Zod error
      if (error?.errors) {
        return NextResponse.json(error.errors, {
          status: 400,
        });
      }
      // Handle Mongoose error
      if (error.name === "ValidationError") {
        return NextResponse.json(error.message, {
          status: 400,
        });
      }
      // Handle Mongoose duplicate key error
      if (error.code === 11000) {
        return NextResponse.json("Duplicate Key Error", {
          status: 400,
        });
      }
      // Handle other errors
      console.error(error);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }
  };
}

export class CustomResponse {
  data: any;
  statusCode: number;
  message: string;
  constructor(data: any, statusCode = 200, message = "ok") {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
}
