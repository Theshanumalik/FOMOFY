import React from "react";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Footer from "./_components/footer";
import FAQ from "./_components/faq";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
