"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

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

      <div className="p-10 max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Learning Roadmap
        </h1>

        <textarea
          placeholder="Paste Resume Text"
          value={resumeText}
          onChange={(e) =>
            setResumeText(
              e.target.value
            )
          }
          className="border p-4 rounded-lg w-full h-52 mb-6"
        />

        <input
          type="text"
          placeholder="Target Role"
          value={targetRole}
          onChange={(e) =>
            setTargetRole(
              e.target.value
            )
          }
          className="border p-4 rounded-lg w-full mb-6"
        />

        <button
          onClick={handleGenerate}
          className="bg-black text-white px-6 py-3 rounded"
        >

          {
            loading
              ? "Generating..."
              : "Generate Roadmap"
          }

        </button>

        {
          roadmap && (

            <div className="mt-10 grid md:grid-cols-2 gap-6">

              {
                Object.entries(
                  roadmap
                ).map(
                  (
                    [week, tasks]
                  ) => (

                    <div
                      key={week}
                      className="
                        border
                        rounded-lg
                        p-5
                        shadow-lg
                      "
                    >

                      <h2 className="text-2xl font-bold mb-4 capitalize">

                        {
                          week.replace(
                            "_",
                            " "
                          )
                        }

                      </h2>

                      <ul className="list-disc ml-6 space-y-2">

                        {
                          tasks.map(
                            (
                              task,
                              index
                            ) => (

                              <li
                                key={index}
                              >
                                {task}
                              </li>

                            )
                          )
                        }

                      </ul>

                    </div>

                  )
                )
              }

            </div>

          )
        }

      </div>
    </>
  );
}