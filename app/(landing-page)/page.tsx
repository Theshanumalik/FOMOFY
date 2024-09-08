import Hero from "./_components/hero";
import FAQ from "./_components/faq";
import Script from "next/script";

const Home = () => {
  return (
    <>
      <Hero />
      <FAQ />
      <Script
        src="https://fomofy.vercel.app/api/script/?project-id=66dd8138cc36f7032ba35d93"
        defer
      />
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" defer />
    </>
  );
};

export default Home;
