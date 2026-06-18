"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import AnimatedCard
  from "@/components/AnimatedCard";

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
              placeholder="Paste Resume Text"
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
              placeholder="Paste Job Description"
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

              <AnimatedCard>

                <Card>

                  <h2
                    className="
      text-2xl
      font-bold
      text-center
      mb-8
      "
                  >
                    AI Match Score
                  </h2>

                  <div
                    className="
      w-56
      h-56
      mx-auto
      "
                  >

                    <CircularProgressbar
                      value={
                        result.match_score
                      }
                      text={`${result.match_score}%`}
                      styles={buildStyles({

                        pathColor:
                          result.match_score >= 80
                            ? "#22c55e"
                            : result.match_score >= 60
                              ? "#eab308"
                              : "#ef4444",

                        textColor:
                          "#ffffff",

                        trailColor:
                          "#27272a"

                      })}
                    />

                  </div>

                  <p
                    className="
      text-center
      text-zinc-400
      mt-6
      "
                  >
                    ML + AI Powered Matching
                  </p>

                </Card>

              </AnimatedCard>

              {/* Skills */}

              <div
                className="
                grid
                md:grid-cols-2
                gap-6
                "
              >

                {/* Matching */}

                <AnimatedCard delay={0.1}>

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
                              bg-green-500/10
                              text-green-400
                              border
                              border-green-500/20
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

                </AnimatedCard>

                {/* Missing */}
                <AnimatedCard delay={0.2}>

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
                                bg-red-500/10
                                text-red-400
                                border
                                border-red-500/20
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
</AnimatedCard>

              </div>

              {/* Suggestions */}

              <AnimatedCard delay={0.3}>

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
                          bg-zinc-900
                          border
                          border-zinc-800
                          rounded-2xl
                          p-4
                          hover:border-blue-500/30
                          transition
                          "
                        >
                          💡 {item}
                        </div>

                      )
                    )
                  }

                </div>

              </Card>
              </AnimatedCard>
            </div>

          )
        }

      </PageContainer>

    </>
  );

}