"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import ScoreCircle from "@/components/ScoreCircle";

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

      const data =
        await matchJob(
          resumeText,
          jobDescription
        );

      setResult(data);

    } catch (error) {

      console.log(error);

      alert(
        "Matching Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <>
      <Navbar />

      <PageContainer>

        {/* Header */}

        <Card className="mb-10">

          <h1
            className="
            text-4xl
            font-bold
            mb-4
            "
          >
            Job Match Analyzer
          </h1>

          <p
            className="
            text-zinc-400
            mb-6
            "
          >
            Compare your resume with a job
            description and discover missing
            skills, matching skills and
            improvement opportunities.
          </p>

          <div
            className="
            grid
            md:grid-cols-2
            gap-6
            "
          >

            <textarea
              placeholder="Paste Resume Text Here..."
              value={resumeText}
              onChange={(e) =>
                setResumeText(
                  e.target.value
                )
              }
              className="
              border
              border-zinc-700
              rounded-xl
              p-4
              h-64
              w-full
              "
            />

            <textarea
              placeholder="Paste Job Description Here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              className="
              border
              border-zinc-700
              rounded-xl
              p-4
              h-64
              w-full
              "
            />

          </div>

          <div className="mt-6">

            <Button
              onClick={handleMatch}
            >
              {
                loading
                  ? "Analyzing..."
                  : "Match Resume"
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

              {/* Score */}

              <Card>

                <ScoreCircle
                  score={
                    result.match_score
                  }
                  label="Match Score"
                />

              </Card>

              {/* Skills */}

              <div
                className="
                grid
                md:grid-cols-2
                gap-6
                "
              >

                {/* Matching */}

                <Card>

                  <h2
                    className="
                    text-2xl
                    font-bold
                    text-green-400
                    mb-5
                    "
                  >
                    Matching Skills
                  </h2>

                  <div
                    className="
                    flex
                    flex-wrap
                    gap-3
                    "
                  >

                    {
                      result.matching_skills?.map(
                        (
                          skill,
                          index
                        ) => (

                          <span
                            key={index}
                            className="
                            bg-green-500
                            text-white
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            "
                          >
                            {skill}
                          </span>

                        )
                      )
                    }

                  </div>

                </Card>

                {/* Missing */}

                <Card>

                  <h2
                    className="
                    text-2xl
                    font-bold
                    text-red-400
                    mb-5
                    "
                  >
                    Missing Skills
                  </h2>

                  <div
                    className="
                    flex
                    flex-wrap
                    gap-3
                    "
                  >

                    {
                      result.missing_skills?.map(
                        (
                          skill,
                          index
                        ) => (

                          <span
                            key={index}
                            className="
                            bg-red-500
                            text-white
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            "
                          >
                            {skill}
                          </span>

                        )
                      )
                    }

                  </div>

                </Card>

              </div>

              {/* Suggestions */}

              <Card>

                <h2
                  className="
                  text-2xl
                  font-bold
                  mb-6
                  "
                >
                  Suggestions
                </h2>

                <div
                  className="
                  space-y-4
                  "
                >

                  {
                    result.suggestions?.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                          bg-blue-500/10
                          border
                          border-blue-500/20
                          rounded-xl
                          p-4
                          "
                        >
                          💡 {item}
                        </div>

                      )
                    )
                  }

                </div>

              </Card>

            </div>

          )
        }

      </PageContainer>

    </>
  );

}