"use client";

import { useState }
from "react";

import Navbar
from "@/components/Navbar";

import {
  generateCoverLetter
}
from "@/services/coverLetterService";

export default function CoverLetterPage() {

  const [resumeText,
    setResumeText] =
      useState("");

  const [jobDescription,
    setJobDescription] =
      useState("");

  const [coverLetter,
    setCoverLetter] =
      useState("");

  const [loading,
    setLoading] =
      useState(false);

  const handleGenerate =
    async () => {

      try {

        setLoading(true);

        const data =
          await generateCoverLetter(
            resumeText,
            jobDescription
          );

        setCoverLetter(
          data.cover_letter
        );

      } catch (error) {

        console.log(error);

        alert(
          "Generation Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  const copyLetter = () => {

    navigator.clipboard.writeText(
      coverLetter
    );

    alert(
      "Copied!"
    );

  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Cover Letter Generator
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

        <textarea
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          className="border p-4 rounded-lg w-full h-52 mb-6"
        />

        <button
          onClick={handleGenerate}
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded
          "
        >

          {
            loading
              ? "Generating..."
              : "Generate Cover Letter"
          }

        </button>

        {
          coverLetter && (

            <div className="mt-10">

              <div className="flex justify-between mb-4">

                <h2 className="text-2xl font-bold">
                  Generated Cover Letter
                </h2>

                <button
                  onClick={copyLetter}
                  className="
                    bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Copy
                </button>

              </div>

              <textarea
                value={coverLetter}
                readOnly
                className="
                  border
                  p-4
                  rounded-lg
                  w-full
                  h-[600px]
                "
              />

            </div>

          )
        }

      </div>
    </>
  );
}