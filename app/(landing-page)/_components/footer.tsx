import Link from "next/link";
import React from "react";
import { BiLogoGithub, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Blog</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              target="_blank"
              href="https://twitter.com/theshanumalik"
              className="fill-content"
            >
              <BiLogoTwitter size={24} />
            </a>
            <a
              href="https://github.com/theshanumalik"
              className="link link-hover"
            >
              <BiLogoGithub size={24} />
            </a>
            <a
              href="https://youtube.com/theshanumalik"
              className="link link-hover"
            >
              <BiLogoYoutube size={24} />
            </a>
          </div>
        </nav>
        <aside>
          <p>
            Design &#x26; Developed by{" "}
            <a
              href="https://theshanumalik.vercel.com"
              className="link link-hover"
            >
              Shanu Malik
            </a>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
