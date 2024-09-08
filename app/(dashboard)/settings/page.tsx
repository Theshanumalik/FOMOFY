import { getUser } from "@/lib/auth";
import Image from "next/image";
import React from "react";

const Settings = async () => {
  const user = await getUser();

  if (!user) return null;
  return (
    <div>
      <div className="card bg-base-100 shadow-xl max-w-lg mx-auto card-compact lg:card-normal">
        <figure>
          <Image
            src={user.image as string}
            alt={user.name + "'s profile"}
            quality={70}
            height={200}
            width={200}
            className="rounded-full object-cover mt-4"
          />
        </figure>
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="name"
              className="input input-bordered input-disabled"
              required
              value={user.name || ""}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered input-disabled"
              required
              value={user.email || ""}
              disabled
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary mb-2">Membership</button>
            <button className="btn btn-error btn-outline">Logout</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
