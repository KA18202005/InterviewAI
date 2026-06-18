"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SkeletonCard
    from "@/components/SkeletonCard";

import AnimatedCard
    from "@/components/AnimatedCard";

import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import { getDashboardData } from "@/services/dashboardService";

export default function Dashboard() {

    const [data, setData] =
        useState(null);
    const chartData = [

        {
            name: "Resume",
            score:
                data?.latest_resume_score || 0
        },

        {
            name: "Average",
            score:
                data?.average_score || 0
        },

        {
            name: "Highest",
            score:
                data?.highest_score || 0
        },

        {
            name: "Lowest",
            score:
                data?.lowest_score || 0
        }

    ];

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
                    mb-10
                    rounded-3xl
                    p-8
                    bg-zinc-900
                    animate-pulse
                    h-40
                    "
                    />

                    <div
                        className="
                    grid
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                    "
                    >

                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />

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

                <AnimatedCard>

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

                </AnimatedCard>

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

                    <AnimatedCard delay={0}>
                        <Card>
                            <p className="text-zinc-500 uppercase tracking-wider text-sm">
                                Interviews
                            </p>

                            <h2 className="text-6xl font-bold mt-3">
                                {data.total_interviews}
                            </h2>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard delay={0.1}>
                        <Card>
                            <p className="text-zinc-500 uppercase tracking-wider text-sm">
                                Resumes
                            </p>

                            <h2 className="text-6xl font-bold mt-3">
                                {data.total_resumes}
                            </h2>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard delay={0.2}>
                        <Card>
                            <p className="text-zinc-500 uppercase tracking-wider text-sm">
                                Average Score
                            </p>

                            <h2 className="text-6xl font-bold mt-3">
                                {data.average_score}
                            </h2>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard delay={0.3}>
                        <Card>
                            <p className="text-zinc-500 uppercase tracking-wider text-sm">
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
                    </AnimatedCard>

                </div>

                {/* Bottom Section */}

                <div
                    className="
    grid
    lg:grid-cols-3
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

                    {/* Chart */}

                    <Card>

                        <h2
                            className="
            text-2xl
            font-bold
            mb-6
            "
                        >
                            Analytics Trend
                        </h2>

                        <div
                            className="
            h-[280px]
            "
                        >

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={chartData}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="name"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

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

                    <AnimatedCard delay={0.4}>

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

                                {
                                    data.recent_activity?.length > 0 ? (

                                        data.recent_activity.map(
                                            (
                                                activity,
                                                index
                                            ) => (

                                                <div
                                                    key={index}
                                                    className="
                        bg-zinc-900
                        p-4
                        rounded-xl
                        border
                        border-zinc-800
                        "
                                                >
                                                    {activity}
                                                </div>

                                            )
                                        )

                                    ) : (

                                        <div
                                            className="
                bg-zinc-900
                p-4
                rounded-xl
                text-zinc-400
                "
                                        >
                                            No activity yet.
                                        </div>

                                    )
                                }

                            </div>

                        </Card>

                    </AnimatedCard>

                </div>

            </PageContainer>

        </>
    );
}