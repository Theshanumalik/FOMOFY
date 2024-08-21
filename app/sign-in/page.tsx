"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BiLogoGithub, BiLogoGoogle } from "react-icons/bi";

const SignIn = () => {
  return (
    <div className="bg-base-100 w-full h-screen grid place-items-center">
      <div className="card border lg:card-side bg-base-100 shadow-xl w-full max-w-lg">
        <div className="card-body text-center">
          <div className="flex flex-col gap-1 items-center justify-center my-4">
            <Image
              src={"/img/icon.png"}
              width={100}
              height={100}
              alt="FOMOFY Logo"
            />
            <h1 className="font-semibold text-lg">FOMOFY</h1>
            <p>Please sign in to continue.</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/dashboard",
              });
            }}
          >
            Sign in with <BiLogoGoogle size={20} />
          </button>
          <div className="divider my-2">OR</div>
          <button
            className="btn bg-black text-white hover:bg-opacity-90"
            onClick={() => {
              signIn("github", {
                callbackUrl: "/dashboard",
              });
            }}
          >
            Sign in with <BiLogoGithub size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
