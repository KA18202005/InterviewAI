"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

import { getDashboardData } from "@/services/dashboardService";

export default function Dashboard() {

    const [data, setData] =
        useState(null);

    useEffect(() => {

        const fetchDashboard =
            async () => {

                try {

                    const result =
                        await getDashboardData();

                    setData(result);

                } catch (error) {

                    console.log(error);

                }

            };

        fetchDashboard();

    }, []);

    if (!data) {

        return (

            <>
                <Navbar />

                <PageContainer>

                    <div
                        className="
            flex
            justify-center
            items-center
            h-[60vh]
            text-zinc-400
            text-xl
            "
                    >
                        Loading Dashboard...
                    </div>

                </PageContainer>

            </>

        );

    }

    return (

        <>
            <Navbar />

            <PageContainer>

                {/* Hero Section */}

                <div
                    className="
          mb-10
          rounded-3xl
          p-8
          bg-gradient-to-r
          from-blue-600/80
          via-purple-600/80
          to-pink-600/80
          border
          border-white/10
          "
                >

                    <h1
                        className="
            text-5xl
            font-bold
            text-white
            mb-3
            "
                    >
                        Welcome Back 👋
                    </h1>

                    <p
                        className="
            text-lg
            text-white/90
            "
                    >
                        Track your interview preparation,
                        resume performance and career growth.
                    </p>
                    <p
                        className="
  text-lg
  text-white/80
  mt-2
  "
                    >
                        Ready to crack your next interview?
                    </p>

                </div>

                <SectionTitle>
                    Dashboard Analytics
                </SectionTitle>

                {/* Stats */}

                <div
                    className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-10
          "
                >

                    <Card>

                        <p
                            className="
              text-zinc-500
              uppercase
              tracking-wider
              text-sm
              "
                        >
                            Interviews
                        </p>

                        <h2
                            className="
              text-6xl
              font-bold
              mt-3
              "
                        >
                            {data.total_interviews}
                        </h2>

                    </Card>

                    <Card>

                        <p
                            className="
              text-zinc-500
              uppercase
              tracking-wider
              text-sm
              "
                        >
                            Resumes
                        </p>

                        <h2
                            className="
              text-6xl
              font-bold
              mt-3
              "
                        >
                            {data.total_resumes}
                        </h2>

                    </Card>

                    <Card>

                        <p
                            className="
              text-zinc-500
              uppercase
              tracking-wider
              text-sm
              "
                        >
                            Average Score
                        </p>

                        <h2
                            className="
              text-6xl
              font-bold
              mt-3
              "
                        >
                            {data.average_score}
                        </h2>

                    </Card>

                    <Card>

                        <p
                            className="
              text-zinc-500
              uppercase
              tracking-wider
              text-sm
              "
                        >
                            Resume ATS
                        </p>

                        <h2
                            className="
              text-6xl
              font-bold
              mt-3
              text-green-400
              "
                        >
                            {data.latest_resume_score}
                        </h2>

                    </Card>

                </div>

                {/* Bottom Section */}

                <div
                    className="
          grid
          lg:grid-cols-2
          gap-6
          "
                >

                    {/* Performance */}

                    <Card>

                        <h2
                            className="
              text-2xl
              font-bold
              mb-6
              "
                        >
                            Performance
                        </h2>

                        <div
                            className="
              space-y-4
              "
                        >

                            <div
                                className="
                bg-zinc-800/50
                rounded-2xl
                p-5
                "
                            >

                                <p
                                    className="
                  text-zinc-400
                  "
                                >
                                    Highest Score
                                </p>

                                <h3
                                    className="
                  text-4xl
                  font-bold
                  text-green-400
                  "
                                >
                                    {data.highest_score}
                                </h3>

                            </div>

                            <div
                                className="
                bg-zinc-800/50
                rounded-2xl
                p-5
                "
                            >

                                <p
                                    className="
                  text-zinc-400
                  "
                                >
                                    Lowest Score
                                </p>

                                <h3
                                    className="
                  text-4xl
                  font-bold
                  text-red-400
                  "
                                >
                                    {data.lowest_score}
                                </h3>

                            </div>

                        </div>

                    </Card>

                    {/* Quick Actions */}

                    <Card>

                        <h2
                            className="
    text-2xl
    font-bold
    mb-6
    "
                        >
                            Quick Actions
                        </h2>

                        <div
                            className="
    flex
    flex-col
    gap-4
    "
                        >

                            <Link
                                href="/resume"
                                className="
      bg-zinc-800/50
      rounded-2xl
      p-4
      hover:bg-zinc-700/50
      transition
      cursor-pointer
      "
                            >
                                📄 Analyze Resume
                            </Link>

                            <Link
                                href="/job-match"
                                className="
      bg-zinc-800/50
      rounded-2xl
      p-4
      hover:bg-zinc-700/50
      transition
      cursor-pointer
      "
                            >
                                🎯 Match Job Description
                            </Link>

                            <Link
                                href="/interview"
                                className="
      bg-zinc-800/50
      rounded-2xl
      p-4
      hover:bg-zinc-700/50
      transition
      cursor-pointer
      "
                            >
                                🎤 Start Mock Interview
                            </Link>

                            <Link
                                href="/roadmap"
                                className="
      bg-zinc-800/50
      rounded-2xl
      p-4
      hover:bg-zinc-700/50
      transition
      cursor-pointer
      "
                            >
                                🗺 Generate Roadmap
                            </Link>

                        </div>

                    </Card>



                </div>
                <div
                    className="
  mt-8
  "
                >

                    <Card>

                        <h2
                            className="
      text-2xl
      font-bold
      mb-6
      "
                        >
                            Recent Activity
                        </h2>

                        <div
                            className="
      space-y-4
      "
                        >

                            <div
                                className="
        bg-zinc-900
        p-4
        rounded-xl
        "
                            >
                                📄 Resume analyzed
                            </div>

                            <div
                                className="
        bg-zinc-900
        p-4
        rounded-xl
        "
                            >
                                🎤 Mock interview completed
                            </div>

                            <div
                                className="
        bg-zinc-900
        p-4
        rounded-xl
        "
                            >
                                🎯 Job match generated
                            </div>

                        </div>

                    </Card>

                </div>

            </PageContainer>

        </>
    );
}