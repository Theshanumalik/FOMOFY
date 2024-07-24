"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return <Toaster toastOptions={{ position: "top-right" }} />;
};

export default ToastProvider;
