"use client";

import { useEffect, useState }
from "react";

import Navbar
from "@/components/Navbar";

import {
  getResumeHistory
}
from "@/services/resumeHistoryService";

export default function ResumeHistoryPage() {

  const [resumes,
    setResumes] =
      useState([]);

  useEffect(() => {

    const fetchResumes =
      async () => {

        try {

          const data =
            await getResumeHistory();

          setResumes(
            data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchResumes();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-8">
          Resume History
        </h1>

        {
          resumes.length === 0 ? (

            <p>
              No resumes found.
            </p>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {
                resumes.map(
                  (resume) => (

                    <div
                      key={
                        resume._id
                      }
                      className="
                        border
                        rounded-lg
                        p-6
                        shadow
                      "
                    >

                      <h2 className="text-xl font-bold mb-3">

                        {
                          resume.filename
                        }

                      </h2>

                      <p>

                        Resume Score:
                        {" "}

                        <span className="font-bold text-green-500">

                          {
                            resume.analysis?.resume_score || 0
                          }

                        </span>

                      </p>

                      <p className="mt-2 text-gray-600">

                        Skills:
                        {" "}

                        {
                          resume.analysis?.skills?.length || 0
                        }

                      </p>

                      <p className="mt-2 text-gray-600">

                        Projects:
                        {" "}

                        {
                          resume.analysis?.projects?.length || 0
                        }

                      </p>

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