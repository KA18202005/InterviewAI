"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

import { startInterview } from "@/services/interviewService";

import { evaluateAnswer }
  from "@/services/interviewEvaluationService";

export default function InterviewPage() {

  const [resumeText, setResumeText] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [selectedQuestion, setSelectedQuestion] =
    useState("");

  const [sessionId, setSessionId] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [evaluation, setEvaluation] =
    useState(null);

  const [questions, setQuestions] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleGenerate = async () => {

    try {

      setLoading(true);

      const data =
        await startInterview(
          resumeText,
          jobDescription

        );
      setSessionId(
        data.session_id
      );

      setQuestions(
        data.questions
      );

    } catch (error) {

      console.log(error);

      alert(
        "Interview Generation Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleEvaluate = async () => {

    try {

      const result =
        await evaluateAnswer(
          sessionId,
          selectedQuestion,
          answer
        );

      setEvaluation(result);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          AI Interview Simulator
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <textarea
            placeholder="Paste Resume Text"
            value={resumeText}
            onChange={(e) =>
              setResumeText(
                e.target.value
              )
            }
            className="border p-4 rounded-lg h-64"
          />

          <textarea
            placeholder="Paste Job Description"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            className="border p-4 rounded-lg h-64"
          />

        </div>

        <button
          onClick={handleGenerate}
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >

          {
            loading
              ? "Generating..."
              : "Start Interview"
          }

        </button>

        {
          questions && (

            <div className="mt-10 space-y-10">

              {/* Technical */}

              <div>

                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Technical Questions
                </h2>

                {
                  questions.technical_questions?.map(
                    (q, index) => (

                      <div
                        key={index}
                        onClick={() => {
                          setSelectedQuestion(q);
                          setEvaluation(null);
                          setAnswer("");
                        }}
                        className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-100">
                        {q}
                      </div>

                    )
                  )
                }

              </div>

              {/* Behavioral */}

              <div>

                <h2 className="text-2xl font-bold text-green-500 mb-4">
                  Behavioral Questions
                </h2>

                {
                  questions.behavioral_questions?.map(
                    (q, index) => (

                      <div
                        key={index}
                        onClick={() =>
                          setSelectedQuestion(q)
                        }
                        className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-100">

                        {q}
                      </div>

                    )
                  )
                }

              </div>

              {/* Project */}

              <div>

                <h2 className="text-2xl font-bold text-purple-500 mb-4">
                  Project Questions
                </h2>

                {
                  questions.project_questions?.map(
                    (q, index) => (

                      <div
                        key={index}
                        onClick={() =>
                          setSelectedQuestion(q)
                        }
                        className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-100">
                        {q}
                      </div>

                    )
                  )
                }

              </div>

            </div>

          )

        }
        {
          selectedQuestion && (

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                Selected Question
              </h2>

              <div className="border p-4 rounded mb-4">
                {selectedQuestion}
              </div>

              <textarea
                placeholder="Write your answer..."
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                className="border p-4 rounded w-full h-40"
              />

              <button
                onClick={handleEvaluate}
                className="bg-green-600 text-white px-6 py-3 rounded mt-4">
                Evaluate Answer
              </button>

            </div>

          )
        }
        {
          evaluation && (

            <div className="mt-10 space-y-6">

              <div className="bg-green-600 text-white p-5 rounded">

                <h2 className="text-2xl font-bold">
                  Score
                </h2>

                <p className="text-5xl">
                  {evaluation.score}/100
                </p>

              </div>

              <div>

                <h3 className="text-xl font-bold text-green-500">
                  Strengths
                </h3>

                <ul className="list-disc ml-6">

                  {
                    evaluation.strengths?.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )
                  }

                </ul>

              </div>

              <div>

                <h3 className="text-xl font-bold text-red-500">
                  Improvements
                </h3>

                <ul className="list-disc ml-6">

                  {
                    evaluation.improvements?.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )
                  }

                </ul>

              </div>

              <div>

                <h3 className="text-xl font-bold">
                  Feedback
                </h3>

                <p>
                  {evaluation.feedback}
                </p>

              </div>

            </div>

          )
        }

      </div>
    </>
  );
}