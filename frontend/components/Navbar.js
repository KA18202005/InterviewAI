"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {

  const pathname = usePathname();
  const router = useRouter();

  const [showMore, setShowMore] =
    useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");

    router.push("/login");

  };

  const mainLinks = [
    {
      name: "Dashboard",
      href: "/dashboard"
    },
    {
      name: "Resume",
      href: "/resume"
    },
    {
      name: "Job Match",
      href: "/job-match"
    },
    {
      name: "Interview",
      href: "/interview"
    },
    {
      name: "Roadmap",
      href: "/roadmap"
    }
  ];

  return (

    <header
      className="
      sticky
      top-0
      z-50
      bg-black/80
      backdrop-blur-lg
      border-b
      border-zinc-800
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >

        {/* Logo */}

        <Link
          href="/dashboard"
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className="
            h-11
            w-11
            rounded-xl
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-lg
            "
          >
            AI
          </div>

          <div>

            <h1
              className="
              text-xl
              font-bold
              "
            >
              InterviewAI
            </h1>

            <p
              className="
              text-xs
              text-zinc-500
              "
            >
              AI Career Assistant
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav
          className="
          hidden
          md:flex
          items-center
          gap-2
          "
        >

          {
            mainLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  transition-all

                  ${
                    pathname === link.href
                      ? `
                      bg-blue-600
                      text-white
                      `
                      : `
                      text-zinc-400
                      hover:text-white
                      hover:bg-zinc-900
                      `
                  }
                `}
              >
                {link.name}
              </Link>

            ))
          }

          <div className="relative">

            <button
              onClick={() =>
                setShowMore(
                  !showMore
                )
              }
              className="
              px-4
              py-2
              rounded-xl
              text-zinc-400
              hover:text-white
              hover:bg-zinc-900
              transition-all
              "
            >
              More
            </button>

            {
              showMore && (

                <div
                  className="
                  absolute
                  top-12
                  right-0
                  w-56
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-xl
                  shadow-xl
                  overflow-hidden
                  "
                >

                  <Link
                    href="/resume-history"
                    className="
                    block
                    px-4
                    py-3
                    hover:bg-zinc-800
                    "
                  >
                    Resume History
                  </Link>

                  <Link
                    href="/interview-history"
                    className="
                    block
                    px-4
                    py-3
                    hover:bg-zinc-800
                    "
                  >
                    Interview History
                  </Link>

                  <Link
                    href="/cover-letter"
                    className="
                    block
                    px-4
                    py-3
                    hover:bg-zinc-800
                    "
                  >
                    Cover Letter
                  </Link>

                </div>

              )
            }

          </div>

        </nav>

        {/* Right Side */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className="
            h-10
            w-10
            rounded-full
            bg-zinc-900
            flex
            items-center
            justify-center
            "
          >
            👤
          </div>

          <button
            onClick={handleLogout}
            className="
            px-5
            py-2
            rounded-xl
            bg-red-500
            hover:bg-red-600
            transition-all
            text-white
            "
          >
            Logout
          </button>

        </div>

      </div>

    </header>

  );

}