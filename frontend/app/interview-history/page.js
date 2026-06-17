"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";

import {
getInterviewHistory
} from "@/services/interviewHistoryService";

export default function InterviewHistoryPage() {

const [interviews,
setInterviews] =
useState([]);

const [loading,
setLoading] =
useState(true);

useEffect(() => {

 
const fetchHistory =
  async () => {

    try {

      const data =
        await getInterviewHistory();

      setInterviews(
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

fetchHistory();
 

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
        Interview History
      </h1>

      <p
        className="
        text-zinc-400
        "
      >
        Review all mock interviews,
        performance and progress.
      </p>

    </Card>

    {
      loading ? (

        <Card>

          Loading interviews...

        </Card>

      ) : interviews.length === 0 ? (

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
              No Interviews Found
            </h2>

            <p
              className="
              text-zinc-400
              "
            >
              Complete your first mock
              interview to see results here.
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
            interviews.map(
              (
                interview,
                index
              ) => {

                const scores =
                  interview.answers?.map(
                    (
                      answer
                    ) =>
                      answer.score
                  ) || [];

                const average =
                  scores.length
                    ? (
                        scores.reduce(
                          (
                            a,
                            b
                          ) =>
                            a + b,
                          0
                        ) /
                        scores.length
                      ).toFixed(
                        1
                      )
                    : 0;

                const totalQuestions =
                  (
                    interview.questions
                      ?.technical_questions
                      ?.length || 0
                  ) +
                  (
                    interview.questions
                      ?.behavioral_questions
                      ?.length || 0
                  ) +
                  (
                    interview.questions
                      ?.project_questions
                      ?.length || 0
                  );

                return (

                  <Card
                    key={
                      interview._id
                    }
                  >

                    <div
                      className="
                      flex
                      justify-between
                      items-start
                      mb-5
                      "
                    >

                      <h2
                        className="
                        text-2xl
                        font-bold
                        "
                      >
                        Interview #
                        {index + 1}
                      </h2>

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          interview.status === "completed"
                            ? `
                            bg-green-500/10
                            text-green-400
                            `
                            : `
                            bg-yellow-500/10
                            text-yellow-400
                            `
                        }
                      `}
                      >
                        {
                          interview.status
                        }
                      </span>

                    </div>

                    <div
                      className="
                      space-y-3
                      text-zinc-400
                      "
                    >

                      <div>
                        Questions:
                        {" "}
                        <span className="text-white font-semibold">
                          {
                            totalQuestions
                          }
                        </span>
                      </div>

                      <div>
                        Answers Submitted:
                        {" "}
                        <span className="text-white font-semibold">
                          {
                            interview.answers
                              ?.length || 0
                          }
                        </span>
                      </div>

                      <div>
                        Average Score:
                        {" "}
                        <span className="text-green-400 font-bold">
                          {average}
                        </span>
                      </div>

                    </div>

                  </Card>

                );

              }
            )
          }

        </div>

      )
    }

  </PageContainer>

</>
 

);

}
