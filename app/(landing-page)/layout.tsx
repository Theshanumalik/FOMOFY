import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
