"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import ScoreCircle from "@/components/ScoreCircle";

import { startInterview } from "@/services/interviewService";
import { evaluateAnswer } from "@/services/interviewEvaluationService";

export default function InterviewPage() {

  const [resumeText, setResumeText] =
    useState("");

  const [isRecording, setIsRecording] =
    useState(false);

  const [recognition, setRecognition] =
    useState(null);

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

      setEvaluation(
        result
      );

    } catch (error) {

      console.log(error);

    }


  };

  const startRecording = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;

    }

    const recognitionInstance =
      new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onstart = () => {

      setIsRecording(true);

    };

    recognitionInstance.onend = () => {

      setIsRecording(false);

    };

    recognitionInstance.onresult = (
      event
    ) => {

      let transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript;

      }

      setAnswer(
        transcript
      );

    };

    setRecognition(
      recognitionInstance
    );

    recognitionInstance.start();

  };

  const stopRecording = () => {

    if (recognition) {

      recognition.stop();

      setIsRecording(false);

    }

  };

  const renderQuestions = (
    title,
    color,
    questionList
  ) => (


    <Card>

      <h2
        className={`text-2xl font-bold mb-5 ${color}`}
      >
        {title}
      </h2>

      <div className="space-y-3">

        {
          questionList?.map(
            (q, index) => (

              <div
                key={index}
                onClick={() => {

                  setSelectedQuestion(
                    q
                  );

                  setAnswer("");

                  setEvaluation(
                    null
                  );

                }}
                className={`
              p-4
              rounded-xl
              cursor-pointer
              transition-all
              border

              ${selectedQuestion === q
                    ? `
                  border-blue-500
                  bg-blue-500/10
                  `
                    : `
                  border-zinc-800
                  hover:border-zinc-600
                  `
                  }
            `}
              >
                {q}
              </div>

            )
          )
        }

      </div>

    </Card>


  );

  return (


    <>
      <Navbar />

      <PageContainer>

        <Card className="mb-10">

          <h1 className="text-4xl font-bold mb-4">
            AI Interview Simulator
          </h1>

          <p className="text-zinc-400 mb-6">
            Generate personalized interview
            questions and receive AI-powered
            evaluation.
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
                  : "Start Interview"
              }
            </Button>

          </div>

        </Card>

        {
          questions && (

            <div className="space-y-6">

              {
                renderQuestions(
                  "Technical Questions",
                  "text-blue-400",
                  questions.technical_questions
                )
              }

              {
                renderQuestions(
                  "Behavioral Questions",
                  "text-green-400",
                  questions.behavioral_questions
                )
              }

              {
                renderQuestions(
                  "Project Questions",
                  "text-purple-400",
                  questions.project_questions
                )
              }

            </div>

          )
        }

        {
          selectedQuestion && (

            <Card className="mt-10">

              <h2
                className="
            text-2xl
            font-bold
            mb-4
            "
              >
                Selected Question
              </h2>

              <div
                className="
            bg-zinc-900
            rounded-xl
            p-5
            mb-5
            "
              >
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
                className="
            border
            border-zinc-700
            rounded-xl
            p-4
            w-full
            h-48
            "
              />

              <div className="mt-5">

                <div className="flex gap-4 mt-5 flex-wrap">

                  {
                    !isRecording ? (

                      <Button
                        onClick={startRecording}
                      >
                        🎙 Start Recording
                      </Button>

                    ) : (

                      <Button
                        onClick={stopRecording}
                      >
                        ⏹ Stop Recording
                      </Button>

                    )
                  }

                  <Button
                    onClick={handleEvaluate}
                  >
                    Evaluate Answer
                  </Button>

                </div>

              </div>

            </Card>

          )
        }

        {
          evaluation && (

            <div className="space-y-6 mt-10">

              <Card>

                <ScoreCircle
                  score={
                    evaluation.score
                  }
                  label="Interview Score"
                />

              </Card>

              <div className="grid md:grid-cols-2 gap-6">

                <Card>

                  <h3
                    className="
                text-2xl
                font-bold
                text-green-400
                mb-5
                "
                  >
                    Strengths
                  </h3>

                  <div className="space-y-3">

                    {
                      evaluation.strengths?.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                        bg-green-500/10
                        p-3
                        rounded-xl
                        "
                          >
                            ✓ {item}
                          </div>

                        )
                      )
                    }

                  </div>

                </Card>

                <Card>

                  <h3
                    className="
                text-2xl
                font-bold
                text-red-400
                mb-5
                "
                  >
                    Improvements
                  </h3>

                  <div className="space-y-3">

                    {
                      evaluation.improvements?.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                        bg-red-500/10
                        p-3
                        rounded-xl
                        "
                          >
                            ⚠ {item}
                          </div>

                        )
                      )
                    }

                  </div>

                </Card>

              </div>

              <Card>

                <h3
                  className="
              text-2xl
              font-bold
              mb-4
              "
                >
                  Detailed Feedback
                </h3>

                <p
                  className="
              text-zinc-300
              leading-8
              "
                >
                  {
                    evaluation.feedback
                  }
                </p>

              </Card>

            </div>

          )
        }

      </PageContainer>

    </>


  );

}
