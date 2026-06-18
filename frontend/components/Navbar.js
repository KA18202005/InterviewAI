"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useState,
  useEffect
} from "react";

import {
  getProfile
} from "@/services/profileService";

import {
  Menu,
  X
} from "lucide-react";



export default function Navbar() {

  const pathname =
    usePathname();

  const router =
    useRouter();

  const [showMore,
    setShowMore] =
    useState(false);

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [user,
    setUser] =
    useState(null);

  const [initials,
    setInitials] =
    useState("U");

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const data =
            await getProfile();

          setUser(
            data
          );

          const userInitials =
            data.name
              .split(" ")
              .map(
                part =>
                  part[0]
              )
              .join("")
              .slice(0, 2)
              .toUpperCase();

          setInitials(
            userInitials
          );

        } catch (error) {

          console.log(
            error
          );

        }

      };

    fetchProfile();

  }, []);

  const handleLogout = () => {


    localStorage.removeItem(
      "token"
    );

    router.push(
      "/login"
    );


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


    <>

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

          {/* Desktop Navigation */}

          <nav
            className="
        hidden
        md:flex
        items-center
        gap-2
        "
          >

            {
              mainLinks.map(
                (link) => (

                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  transition-all

                  ${pathname === link.href

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

                )
              )
            }

            {/* More Menu */}

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
                      onClick={() =>
                        setShowMore(
                          false
                        )
                      }
                      className={`
                    block
                    px-4
                    py-3

                    ${pathname === "/resume-history"

                          ? `
                        bg-blue-600
                        text-white
                        `

                          : `
                        hover:bg-zinc-800
                        `
                        }
                  `}
                    >
                      Resume History
                    </Link>

                    <Link
                      href="/interview-history"
                      onClick={() =>
                        setShowMore(
                          false
                        )
                      }
                      className={`
                    block
                    px-4
                    py-3

                    ${pathname === "/interview-history"

                          ? `
                        bg-blue-600
                        text-white
                        `

                          : `
                        hover:bg-zinc-800
                        `
                        }
                  `}
                    >
                      Interview History
                    </Link>

                    <Link
                      href="/cover-letter"
                      onClick={() =>
                        setShowMore(
                          false
                        )
                      }
                      className={`
                    block
                    px-4
                    py-3

                    ${pathname === "/cover-letter"

                          ? `
                        bg-blue-600
                        text-white
                        `

                          : `
                        hover:bg-zinc-800
                        `
                        }
                  `}
                    >
                      Cover Letter
                    </Link>

                  </div>

                )
              }

            </div>

          </nav>

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="
        md:hidden
        p-2
        rounded-lg
        hover:bg-zinc-800
        "
          >

            {
              mobileMenu

                ? <X size={22} />

                : <Menu size={22} />
            }

          </button>

          {/* Desktop Right Side */}

          <div
            className="
        hidden
        md:flex
        items-center
        gap-3
        "
          >

            <div
              className="
          h-10
          w-10
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-purple-600
          flex
          items-center
          justify-center
          text-white
          font-bold
          "
            >
              {initials}
            </div>

            <button
              onClick={
                handleLogout
              }
              className="
          px-5
          py-2
          rounded-xl
          border
          border-red-500/30
          bg-red-500/10
          text-red-400
          hover:bg-red-500/20
          transition-all
          "
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* Mobile Menu */}

      {
        mobileMenu && (

          <div
            className="
        md:hidden
        bg-zinc-950
        border-b
        border-zinc-800
        "
          >

            <div
              className="
          flex
          flex-col
          p-4
          gap-2
          "
            >

              {
                mainLinks.map(
                  (link) => (

                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className={`
                    px-4
                    py-3
                    rounded-xl

                    ${pathname === link.href

                          ? `
                        bg-blue-600
                        text-white
                        `

                          : `
                        hover:bg-zinc-900
                        `
                        }
                  `}
                    >
                      {link.name}
                    </Link>

                  )
                )
              }

              <Link
                href="/cover-letter"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
                className="
            px-4
            py-3
            rounded-xl
            hover:bg-zinc-900
            "
              >
                Cover Letter
              </Link>

              <Link
                href="/resume-history"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
                className="
            px-4
            py-3
            rounded-xl
            hover:bg-zinc-900
            "
              >
                Resume History
              </Link>

              <Link
                href="/interview-history"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
                className="
            px-4
            py-3
            rounded-xl
            hover:bg-zinc-900
            "
              >
                Interview History
              </Link>

              <button
                onClick={
                  handleLogout
                }
                className="
            mt-3
            px-4
            py-3
            rounded-xl
            bg-red-500/10
            text-red-400
            text-left
            "
              >
                Logout
              </button>

            </div>

          </div>

        )
      }

    </>


  );

}
