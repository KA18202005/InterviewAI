"use client";

import { useEffect, useState }
from "react";

import Navbar
from "@/components/Navbar";

import {
  getInterviewHistory
}
from "@/services/interviewHistoryService";

export default function InterviewHistoryPage() {

  const [interviews,
    setInterviews] =
      useState([]);

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

        }

      };

    fetchHistory();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-8">
          Interview History
        </h1>

        {
          interviews.length === 0 ? (

            <p>
              No interviews found.
            </p>

          ) : (

            <div className="space-y-6">

              {
                interviews.map(
                  (
                    interview,
                    index
                  ) => {

                    const scores =
                      interview.answers?.map(
                        a => a.score
                      ) || [];

                    const average =
                      scores.length
                        ? (
                            scores.reduce(
                              (a, b) =>
                                a + b,
                              0
                            ) /
                            scores.length
                          ).toFixed(1)
                        : 0;

                    return (

                      <div
                        key={
                          interview._id
                        }
                        className="
                          border
                          rounded-lg
                          p-5
                          shadow
                        "
                      >

                        <h2 className="text-2xl font-bold">

                          Interview #
                          {index + 1}

                        </h2>

                        <p>
                          Status:
                          {" "}
                          {
                            interview.status
                          }
                        </p>

                        <p>
                          Questions:
                          {" "}
                          {
                            interview.questions
                              ?.technical_questions
                              ?.length || 0
                          }
                        </p>

                        <p>
                          Answers:
                          {" "}
                          {
                            interview.answers
                              ?.length || 0
                          }
                        </p>

                        <p className="font-bold text-green-500">

                          Average Score:
                          {" "}
                          {average}

                        </p>

                      </div>

                    );

                  }
                )
              }

            </div>

          )
        }

      </div>

    </>
  );
}