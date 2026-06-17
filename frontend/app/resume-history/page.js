"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";

import {
getResumeHistory
} from "@/services/resumeHistoryService";

export default function ResumeHistoryPage() {

const [resumes,
setResumes] =
useState([]);

const [loading,
setLoading] =
useState(true);

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

    } finally {

      setLoading(
        false
      );

    }

  };

fetchResumes();
 

}, []);

return (

 
<>
  <Navbar />

  <PageContainer>

    <Card className="mb-10">

      <h1
        className="
        text-4xl
        font-bold
        mb-3
        "
      >
        Resume History
      </h1>

      <p
        className="
        text-zinc-400
        "
      >
        Review all previously analyzed
        resumes and compare scores.
      </p>

    </Card>

    {
      loading ? (

        <Card>

          <p>
            Loading resumes...
          </p>

        </Card>

      ) : resumes.length === 0 ? (

        <Card>

          <div
            className="
            text-center
            py-10
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-2
              "
            >
              No Resumes Found
            </h2>

            <p
              className="
              text-zinc-400
              "
            >
              Upload and analyze a resume
              to see history here.
            </p>

          </div>

        </Card>

      ) : (

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          "
        >

          {
            resumes.map(
              (
                resume
              ) => (

                <Card
                  key={
                    resume._id
                  }
                >

                  <div
                    className="
                    flex
                    justify-between
                    items-start
                    mb-4
                    "
                  >

                    <h2
                      className="
                      text-xl
                      font-bold
                      "
                    >
                      {
                        resume.filename
                      }
                    </h2>

                    <div
                      className="
                      bg-green-500/10
                      text-green-400
                      px-3
                      py-1
                      rounded-full
                      font-bold
                      "
                    >
                      {
                        resume.analysis?.resume_score || 0
                      }
                    </div>

                  </div>

                  <div
                    className="
                    space-y-3
                    text-zinc-400
                    "
                  >

                    <div>
                      Skills:
                      {" "}
                      <span className="text-white font-semibold">
                        {
                          resume.analysis?.skills?.length || 0
                        }
                      </span>
                    </div>

                    <div>
                      Projects:
                      {" "}
                      <span className="text-white font-semibold">
                        {
                          resume.analysis?.projects?.length || 0
                        }
                      </span>
                    </div>

                    <div>
                      Strengths:
                      {" "}
                      <span className="text-white font-semibold">
                        {
                          resume.analysis?.strengths?.length || 0
                        }
                      </span>
                    </div>

                  </div>

                </Card>

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
