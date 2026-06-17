"use client";

import { useEffect, useState } from "react";

import { getDashboardData } from "@/services/dashboardService";

import Navbar from "@/components/Navbar";

export default function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

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
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="border rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Interviews
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.total_interviews}
                    </p>
                </div>

                <div className="border rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Resumes
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.total_resumes}
                    </p>
                </div>

                <div className="border rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Avg Score
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.average_score}
                    </p>
                </div>

                <div className="border rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Resume ATS
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.latest_resume_score}
                    </p>
                </div>

            </div>
        </>
    );
}