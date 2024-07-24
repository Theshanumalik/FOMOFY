import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-xl my-10">
          <h1 className="text-5xl font-bold">
            FOMOFY to Skyrocket Conversions
          </h1>
          <p className="py-6">
            FOMOFY is a simple and easy-to-use platform that helps you create
            beautiful and engaging FOMO notifications for your website in
            minutes.
          </p>

          <Link href={"/dashboard"} className="btn btn-primary px-10">
            Get Started <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;