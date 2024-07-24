"use client";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import PopSchedule from "../../_components/forms/pop-schedule";

const ManageSitePage = () => {
  const popScheduleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href="#" className="btn">
          <FaArrowLeft />{" "}
        </Link>
        <div>
          <h3 className="font-semibold">theshanumalik</h3>
          <Link href="#" className="text-sm">
            theshanumalik.com
          </Link>
        </div>
      </div>
      <div className="flex gap-2 my-3">
        <PopSchedule onSubmit={popScheduleSubmit} values={{}} />
      </div>
    </div>
  );
};

export default ManageSitePage;
