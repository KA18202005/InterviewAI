"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import ScoreCircle from "@/components/ScoreCircle";

import { analyzeResume } from "@/services/resumeService";

export default function ResumePage() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState(null);

    const handleUpload = async () => {

        if (!file) {

            alert(
                "Please select a PDF"
            );

            return;

        }

        try {

            setLoading(true);

            const data =
                await analyzeResume(
                    file
                );

            setResult(data);

        } catch (error) {

            console.log(error);

            alert(
                "Upload Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <PageContainer>

                {/* Upload Section */}

                <Card className="mb-10">

                    <h1
                        className="
                        text-4xl
                        font-bold
                        mb-4
                        "
                    >
                        Resume Analysis
                    </h1>

                    <p
                        className="
                        text-zinc-400
                        mb-6
                        "
                    >
                        Upload your resume and get ATS score,
                        strengths, weaknesses, skills and
                        project insights instantly.
                    </p>

                    <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        gap-4
                        items-center
                        "
                    >

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setFile(
                                    e.target.files[0]
                                )
                            }
                            className="
                            w-full
                            border
                            border-zinc-700
                            rounded-xl
                            p-3
                            "
                        />

                        <Button
                            onClick={handleUpload}
                        >
                            {
                                loading
                                    ? "Analyzing..."
                                    : "Analyze Resume"
                            }
                        </Button>

                    </div>

                </Card>

                {
                    result && (

                        <div
                            className="
                            space-y-10
                            "
                        >

                            {/* ATS Score */}

                            <Card>

                                <ScoreCircle
                                    score={
                                        result.analysis
                                            .resume_score
                                    }
                                    label="ATS Score"
                                />

                            </Card>

                            {/* Skills */}

                            <Card>

                                <h3
                                    className="
                                    text-2xl
                                    font-bold
                                    mb-6
                                    "
                                >
                                    Skills
                                </h3>

                                <div
                                    className="
                                    flex
                                    flex-wrap
                                    gap-3
                                    "
                                >

                                    {
                                        result.analysis.skills?.map(
                                            (
                                                skill,
                                                index
                                            ) => (

                                                <span
                                                    key={
                                                        index
                                                    }
                                                    className="
                                                    bg-linear-to-r from-blue-500 to-purple-600
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    text-sm
                                                    "
                                                >
                                                    {
                                                        skill
                                                    }
                                                </span>

                                            )
                                        )
                                    }

                                </div>

                            </Card>

                            {/* Strengths & Weaknesses */}

                            <div
                                className="
                                grid
                                md:grid-cols-2
                                gap-6
                                "
                            >

                                <Card>

                                    <h3
                                        className="
                                        text-2xl
                                        font-bold
                                        text-green-400
                                        mb-5
                                        "
                                    >
                                        Strengths
                                    </h3>

                                    <div
                                        className="
                                        space-y-3
                                        "
                                    >

                                        {
                                            result.analysis.strengths?.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <div
                                                        key={
                                                            index
                                                        }
                                                        className="
                                                        bg-green-500/10
                                                        p-3
                                                        rounded-xl
                                                        "
                                                    >
                                                        ✓ {item}
                                                    </div>

                                                )
                                            )
                                        }

                                    </div>

                                </Card>

                                <Card>

                                    <h3
                                        className="
                                        text-2xl
                                        font-bold
                                        text-red-400
                                        mb-5
                                        "
                                    >
                                        Weaknesses
                                    </h3>

                                    <div
                                        className="
                                        space-y-3
                                        "
                                    >

                                        {
                                            result.analysis.weaknesses?.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <div
                                                        key={
                                                            index
                                                        }
                                                        className="
                                                        bg-red-500/10
                                                        p-3
                                                        rounded-xl
                                                        "
                                                    >
                                                        ⚠ {item}
                                                    </div>

                                                )
                                            )
                                        }

                                    </div>

                                </Card>

                            </div>

                            {/* Projects */}

                            <div>

                                <h3
                                    className="
                                    text-3xl
                                    font-bold
                                    mb-6
                                    "
                                >
                                    Projects
                                </h3>

                                <div
                                    className="
                                    grid
                                    md:grid-cols-2
                                    gap-6
                                    "
                                >

                                    {
                                        result.analysis.projects?.map(
                                            (
                                                project,
                                                index
                                            ) => (

                                                <div
                                                    key={
                                                        index
                                                    }
                                                    className="
                                                    bg-zinc-900/60 backdrop-blur-lg border border-zinc-800
                                                    rounded-2xl
                                                    p-6
                                                    hover:border-blue-500
                                                    transition
                                                    "
                                                >

                                                    <h4
                                                        className="
                                                        text-xl
                                                        font-bold
                                                        mb-3
                                                        "
                                                    >
                                                        {
                                                            project.name
                                                        }
                                                    </h4>

                                                    <p
                                                        className="
                                                        text-zinc-400
                                                        mb-4
                                                        "
                                                    >
                                                        {
                                                            project.description
                                                        }
                                                    </p>

                                                    <div
                                                        className="
                                                        flex
                                                        flex-wrap
                                                        gap-2
                                                        "
                                                    >

                                                        {
                                                            project.technologies?.map(
                                                                (
                                                                    tech,
                                                                    i
                                                                ) => (

                                                                    <span
                                                                        key={
                                                                            i
                                                                        }
                                                                        className="
                                                                        bg-purple-500
                                                                        text-white
                                                                        px-3
                                                                        py-1
                                                                        rounded-full
                                                                        text-sm
                                                                        "
                                                                    >
                                                                        {
                                                                            tech
                                                                        }
                                                                    </span>

                                                                )
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            )
                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    )
                }

            </PageContainer>

        </>
    );

}