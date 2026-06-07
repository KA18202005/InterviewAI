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

            <div className="p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                <div className="space-y-4">

                    <div>
                        Total Interviews: {data.total_interviews}
                    </div>

                    <div>
                        Average Score: {data.average_score}
                    </div>

                    <div>
                        Highest Score: {data.highest_score}
                    </div>

                    <div>
                        Lowest Score: {data.lowest_score}
                    </div>

                </div>

            </div>
        </>
    );
}