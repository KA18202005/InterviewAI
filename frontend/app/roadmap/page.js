"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";

import {
  generateRoadmap
} from "@/services/roadmapService";

export default function RoadmapPage() {

  const [resumeText,
    setResumeText] =
    useState("");

  const [targetRole,
    setTargetRole] =
    useState("");

  const [roadmap,
    setRoadmap] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const handleGenerate =
    async () => {


      try {

        setLoading(true);

        const data =
          await generateRoadmap(
            resumeText,
            targetRole
          );

        setRoadmap(data);

      } catch (error) {

        console.log(error);

        alert(
          "Roadmap Generation Failed"
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
            Learning Roadmap
          </h1>

          <p
            className="
        text-zinc-400
        mb-6
        "
          >
            Generate a personalized roadmap
            based on your current skills and
            target role.
          </p>

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
        w-full
        h-52
        mb-6
        "
          />

          <input
            type="text"
            placeholder="Target Role (e.g. Backend Developer)"
            value={targetRole}
            onChange={(e) =>
              setTargetRole(
                e.target.value
              )
            }
            className="
        border
        border-zinc-700
        rounded-xl
        p-4
        w-full
        mb-6
        "
          />

          <Button
            onClick={
              handleGenerate
            }
          >
            {
              loading
                ? "Generating..."
                : "Generate Roadmap"
            }
          </Button>

        </Card>

        {
          roadmap && (

            <div
              className="
          space-y-8
          "
            >

              <Card>

                <h2
                  className="
              text-3xl
              font-bold
              mb-3
              "
                >
                  Your Learning Journey
                </h2>

                <p
                  className="
              text-zinc-400
              "
                >
                  Follow this roadmap step by step
                  to become a stronger
                  {` ${targetRole}`}
                </p>

              </Card>

              {
                Object.entries(
                  roadmap
                ).map(
                  (
                    [week, tasks],
                    index
                  ) => (

                    <div
                      key={week}
                      className="
                  flex
                  gap-5
                  "
                    >

                      {/* Timeline Dot */}

                      <div
                        className="
                    flex
                    flex-col
                    items-center
                    "
                      >

                        <div
                          className="
                      h-10
                      w-10
                      rounded-full
                      bg-blue-600
                      flex
                      items-center
                      justify-center
                      font-bold
                      "
                        >
                          {
                            index + 1
                          }
                        </div>

                        {
                          index <
                          Object.entries(
                            roadmap
                          ).length - 1 && (

                            <div
                              className="
                          w-1
                          h-full
                          bg-zinc-800
                          "
                            />

                          )
                        }

                      </div>

                      {/* Roadmap Card */}

                      <Card className="flex-1">

                        <h2
                          className="
                      text-2xl
                      font-bold
                      mb-4
                      capitalize
                      "
                        >
                          {
                            week.replace(
                              "_",
                              " "
                            )
                          }
                        </h2>

                        <div
                          className="
                      space-y-3
                      "
                        >

                          {
                            tasks.map(
                              (
                                task,
                                i
                              ) => (

                                <div
                                  key={i}
                                  className="
                              bg-blue-500/10
                              border
                              border-blue-500/20
                              rounded-xl
                              p-3
                              "
                                >
                                  ✅ {task}
                                </div>

                              )
                            )
                          }

                        </div>

                      </Card>

                    </div>

                  )
                )
              }

            </div>

          )
        }

      </PageContainer>

    </>


  );

}
