"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

import { analyzeResume } from "@/services/resumeService";

export default function ResumePage() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a PDF");
            return;
        }

        try {

            setLoading(true);

            const data =
                await analyzeResume(file);

            setResult(data);

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="p-10">

                <h1 className="text-4xl font-bold mb-6">
                    Resume Analysis
                </h1>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setFile(
                            e.target.files[0]
                        )
                    }
                />

                <button
                    onClick={handleUpload}
                    className="bg-black text-white px-4 py-2 rounded ml-4"
                >
                    {
                        loading
                            ? "Analyzing..."
                            : "Upload Resume"
                    }
                </button>

                {

                    result && (

                        <div className="mt-10 space-y-8">

                            <h2 className="text-3xl font-bold">
                                Resume Analysis
                            </h2>

                            {/* Resume Score */}

                            <div className="bg-green-600 text-white p-6 rounded-lg">

                                <h3 className="text-2xl font-bold">
                                    Resume Score
                                </h3>

                                <p className="text-5xl mt-3">
                                    {result.analysis.resume_score}/100
                                </p>

                            </div>

                            {/* Skills */}

                            <div>

                                <h3 className="text-2xl font-semibold mb-4">
                                    Skills
                                </h3>

                                <div className="flex flex-wrap gap-2">

                                    {
                                        result.analysis.skills?.map(
                                            (skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )
                                    }

                                </div>

                            </div>

                            {/* Strengths */}

                            <div>

                                <h3 className="text-2xl font-semibold text-green-500 mb-4">
                                    Strengths
                                </h3>

                                <ul className="list-disc ml-6 space-y-2">

                                    {
                                        result.analysis.strengths?.map(
                                            (item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            )
                                        )
                                    }

                                </ul>

                            </div>

                            {/* Weaknesses */}

                            <div>

                                <h3 className="text-2xl font-semibold text-red-500 mb-4">
                                    Weaknesses
                                </h3>

                                <ul className="list-disc ml-6 space-y-2">

                                    {
                                        result.analysis.weaknesses?.map(
                                            (item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            )
                                        )
                                    }

                                </ul>

                            </div>

                            {/* Projects */}

                            <div>

                                <h3 className="text-2xl font-semibold mb-4">
                                    Projects
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">

                                    {
                                        result.analysis.projects?.map(
                                            (project, index) => (

                                                <div
                                                    key={index}
                                                    className="border rounded-lg p-5 shadow-lg"
                                                >

                                                    <h4 className="text-xl font-bold mb-3">
                                                        {project.name}
                                                    </h4>

                                                    <p className="mb-4 text-gray-300">
                                                        {project.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2">

                                                        {
                                                            project.technologies?.map(
                                                                (tech, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="bg-purple-500 text-white px-2 py-1 rounded"
                                                                    >
                                                                        {tech}
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

            </div>
        </>
    );
}