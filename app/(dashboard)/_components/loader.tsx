import React from "react";

const Loader = () => {
  return (
    <div className="w-40 h-40 bg-white shadow-md grid place-items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Loader;
