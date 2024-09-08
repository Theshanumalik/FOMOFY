"use client";
import Link from "next/link";
import React from "react";
import { FaDollarSign, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaGear } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <RxDashboard />,
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <FaDollarSign />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <FaGear />,
    },
    {
      name: "FAQ",
      href: "/faq",
      icon: <FaQuestionCircle />,
    },
  ];
  return (
    <div className="w-60 h-screen p-3 bg-white flex flex-col border-r">
      <div className="my-5">
        <h1 className="font-semibold text-lg hidden lg:block">FOMOFY</h1>
        <Image
          src="/img/icon.png"
          width={100}
          height={100}
          alt="Fomofy logo"
          className="lg:hidden"
        />
      </div>
      <ul className="menu p-0 space-y-3 flex-1">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className={cn(
                "flex items-center p-2 justify-center md:justify-start rounded-md",
                {
                  active: pathname.includes(link.href),
                }
              )}
            >
              <span>{link.icon}</span>
              <span className="hidden md:block">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button
          className="btn flex gap-1 items-center btn-link no-underline text-gray-600 px-0"
          onClick={() => {
            signOut({
              redirect: true,
              callbackUrl: "/",
            });
          }}
        >
          <FaSignOutAlt />
          <span className="hidden lg:block">LOGOUT</span>
        </button>
        <hr />
        <p className="text-xs text-gray-500 mt-2 hidden lg:block">
          © 2024 FOMOFY
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
