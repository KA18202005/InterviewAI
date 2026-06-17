"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("token");

    router.push("/login");
  };

  return (

    <nav className="bg-black text-white px-8 py-4 flex justify-between">

      <h1 className="font-bold text-xl">
        InterviewAI
      </h1>

      <div className="flex gap-6">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/resume">
          Resume Analysis
        </Link>

        <Link href="/job-match">
          Job Match
        </Link>

        <Link href="/resume-history">
          Resume History
        </Link>
        
        <Link href="/cover-letter">
          Cover Letter
        </Link>

        <Link href="/interview">
          Interview
        </Link>

        <Link href="/roadmap">
          Roadmap
        </Link>

        <Link href="/interview-history">
          History
        </Link>

        <button
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}