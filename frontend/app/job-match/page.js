"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

import { matchJob } from "@/services/jobService";

export default function JobMatchPage() {

  const [resumeText, setResumeText] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleMatch = async () => {

    try {

      setLoading(true);

      const data = await matchJob(
        resumeText,
        jobDescription
      );

      setResult(data);

    } catch (error) {

      console.log(error);

      alert("Matching Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Job Match Analyzer
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <textarea
            placeholder="Paste Resume Text Here..."
            value={resumeText}
            onChange={(e) =>
              setResumeText(
                e.target.value
              )
            }
            className="border p-4 rounded-lg h-64"
          />

          <textarea
            placeholder="Paste Job Description Here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            className="border p-4 rounded-lg h-64"
          />

        </div>

        <button
          onClick={handleMatch}
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >

          {
            loading
              ? "Analyzing..."
              : "Match Resume"
          }

        </button>

        {
          result && (

            <div className="mt-10 space-y-8">

              {/* Score */}

              <div className="bg-green-600 text-white p-6 rounded-lg">

                <h2 className="text-2xl font-bold">
                  Match Score
                </h2>

                <p className="text-5xl mt-2">
                  {result.match_score}%
                </p>

              </div>

              {/* Matching Skills */}

              <div>

                <h3 className="text-2xl font-semibold mb-4 text-green-500">
                  Matching Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {
                    result.matching_skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="bg-green-500 text-white px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )
                  }

                </div>

              </div>

              {/* Missing Skills */}

              <div>

                <h3 className="text-2xl font-semibold mb-4 text-red-500">
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {
                    result.missing_skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="bg-red-500 text-white px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )
                  }

                </div>

              </div>

              {/* Suggestions */}

              <div>

                <h3 className="text-2xl font-semibold mb-4">
                  Suggestions
                </h3>

                <ul className="list-disc ml-6 space-y-2">

                  {
                    result.suggestions?.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )
                  }

                </ul>

              </div>

            </div>
          )
        }

      </div>
    </>
  );
}