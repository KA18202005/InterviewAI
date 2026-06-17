"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import jsPDF from "jspdf";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";

import {
  generateCoverLetter
} from "@/services/coverLetterService";

export default function CoverLetterPage() {

  const [resumeText, setResumeText] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [coverLetter, setCoverLetter] =
    useState("");

  const [loading, setLoading] =
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
      "Cover Letter Copied!"
    );


  };

  const downloadPDF = () => {

    const pdf =
      new jsPDF();

    const pageWidth = 180;

    const lines =
      pdf.splitTextToSize(
        coverLetter,
        pageWidth
      );

    let y = 20;

    lines.forEach(
      (line) => {

        if (y > 280) {

          pdf.addPage();

          y = 20;

        }

        pdf.text(
          line,
          15,
          y
        );

        y += 8;

      }
    );

    pdf.save(
      "cover-letter.pdf"
    );

  };

  return (


    <>
      <Navbar />

      <PageContainer>

        <Card className="mb-10">

          <h1 className="text-4xl font-bold mb-4">
            Cover Letter Generator
          </h1>

          <p className="text-zinc-400 mb-6">
            Generate a professional cover letter
            tailored to any job description using
            your resume.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

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
          "
            />

          </div>

          <div className="mt-6">

            <Button
              onClick={
                handleGenerate
              }
            >
              {
                loading
                  ? "Generating..."
                  : "Generate Cover Letter"
              }
            </Button>

          </div>

        </Card>

        {
          coverLetter && (

            <Card>

              <div
                className="
            flex
            flex-col
            md:flex-row
            md:justify-between
            md:items-center
            gap-4
            mb-6
            "
              >

                <div>

                  <h2
                    className="
                text-3xl
                font-bold
                "
                  >
                    Generated Cover Letter
                  </h2>

                  <p
                    className="
                text-zinc-400
                mt-2
                "
                  >
                    Review, edit and copy before
                    sending to employers.
                  </p>

                </div>

                <div
                  className="flex gap-3">
                  <Button
                    onClick={copyLetter}
                  >
                    📋 Copy Letter
                  </Button>

                  <Button
                    onClick={downloadPDF}
                  >
                    ⬇ Download PDF
                  </Button>

                </div>
              </div>

              <div
                className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-6
            "
              >

                <textarea
                  value={coverLetter}
                  readOnly
                  className="
              w-full
              h-175
              bg-transparent
              resize-none
              outline-none
              text-zinc-300
              leading-8
              "
                />

              </div>

            </Card>

          )
        }

      </PageContainer>

    </>


  );

}
