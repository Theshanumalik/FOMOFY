import React from "react";
import Sidebar from "./_components/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-base-200 w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
};

export default layout;
