"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
  downloadReport
}
  from "@/services/pdfService";

import { startInterview } from "@/services/interviewService";
import { evaluateAnswer } from "@/services/interviewEvaluationService";

export default function InterviewPage() {

  const [resumeText, setResumeText] =
    useState("");
  const [completedQuestions, setCompletedQuestions] =
    useState([]);

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

  const handleDownload =
    async () => {

      const pdf =
        await downloadReport(

          selectedQuestion,

          answer,

          evaluation

        );

      const url =
        window.URL.createObjectURL(
          pdf
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "Interview_Report.pdf";

      link.click();

    };

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

      setCompletedQuestions(
        prev => {

          if (
            prev.includes(
              selectedQuestion
            )
          ) {
            return prev;
          }

          return [
            ...prev,
            selectedQuestion
          ];

        }
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

                  setEvaluation(
                    null
                  );

                }}

                className={`
    p-4
    rounded-2xl
    border
    cursor-pointer
    transition-all

    ${selectedQuestion === q

                    ? `
          border-blue-500
          bg-blue-500/10
          shadow-lg
          shadow-blue-500/10
        `

                    : `
          border-zinc-800
          hover:border-zinc-600
          hover:bg-zinc-900
        `
                  }
  `}
              >

                <div
                  className="
    flex
    items-start
    gap-3
    "
                >

                  <div
                    className={`
      h-8
      w-8
      rounded-full
      flex
      items-center
      justify-center
      text-sm
      font-bold

      ${selectedQuestion === q

                        ? `
            bg-blue-500
            text-white
          `

                        : `
            bg-zinc-800
          `
                      }
      `}
                  >
                    {index + 1}
                  </div>

                  <div
                    className="
      flex-1
      "
                  >

                    <p>
                      {q}
                    </p>

                  </div>

                  {
                    completedQuestions.includes(q)

                      ? (

                        <div
                          className="
        text-green-400
        text-lg
        "
                        >
                          ✓
                        </div>

                      )

                      : selectedQuestion === q

                        ? (

                          <div
                            className="
          text-blue-400
          text-lg
          "
                          >
                            ●
                          </div>

                        )

                        : null
                  }

                </div>

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
            <>
              <Card>

                <div
                  className="
    flex
    justify-between
    items-center
    mb-4
    "
                >

                  <h2
                    className="
      text-2xl
      font-bold
      "
                  >
                    Interview Progress
                  </h2>

                  <span
                    className="
      text-blue-400
      font-semibold
      "
                  >
                    {
                      completedQuestions.length
                    }
                    /
                    {
                      (
                        questions.technical_questions?.length || 0
                      ) +
                      (
                        questions.behavioral_questions?.length || 0
                      ) +
                      (
                        questions.project_questions?.length || 0
                      )
                    }
                    Completed
                  </span>

                </div>

                <div
                  className="
    h-3
    bg-zinc-800
    rounded-full
    overflow-hidden
    "
                >

                  <div
                    className="
      h-full
      bg-gradient-to-r
      from-blue-500
      to-purple-500
      transition-all
      duration-500
      "
                    style={{
                      width: `${(
                        completedQuestions.length /
                        (
                          (
                            questions.technical_questions?.length || 0
                          ) +
                          (
                            questions.behavioral_questions?.length || 0
                          ) +
                          (
                            questions.project_questions?.length || 0
                          )
                        )
                      ) * 100
                        }%`
                    }}
                  />

                </div>

              </Card>

              <div className=" grid lg:grid-cols-3 gap-6">
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
            </>



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
  bg-gradient-to-r
  from-blue-500/10
  via-purple-500/10
  to-pink-500/10

  border
  border-blue-500/20

  rounded-3xl

  p-6

  mb-6
  "
              >

                <div
                  className="
    flex
    items-center
    gap-3
    mb-4
    "
                >

                  <div
                    className="
      h-10
      w-10
      rounded-xl
      bg-blue-500
      flex
      items-center
      justify-center
      "
                  >
                    🎯
                  </div>

                  <div>

                    <p
                      className="
        text-sm
        text-zinc-400
        "
                    >
                      Current Question
                    </p>

                    <h3
                      className="
        font-semibold
        "
                    >
                      AI Interview Question
                    </h3>

                  </div>

                </div>

                <p
                  className="
    text-lg
    leading-relaxed
    "
                >
                  {selectedQuestion}
                </p>

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
                    w-full
                    h-52

                    bg-zinc-900

                    border
                    border-zinc-800

                    rounded-3xl

                    p-5

                    focus:outline-none
                    focus:border-blue-500

                    transition-all
                    "
              />
              <div
                className="
                  text-right
                  text-zinc-500
                  text-sm
                  mt-2
                  "
              >
                {answer.length} characters
              </div>

              <div className="mt-5">

                <div className="flex gap-4 mt-5 flex-wrap">

                  {
                    isRecording && (

                      <div
                        className="
                              flex
                              items-center
                              gap-3
                              text-red-400
                              mb-4
                              "
                      >

                        <div
                          className="
                                      h-3
                                      w-3
                                      bg-red-500
                                      rounded-full
                                      animate-pulse
                                      "
                        />

                        <span>
                          Listening...
                        </span>

                      </div>

                    )
                  }

                  {
                    !isRecording ? (

                      <Button
                        onClick={startRecording}
                      >
                        {
                          !isRecording
                            ? "🎙 Start Recording"
                            : "🔴 Recording..."
                        }
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
                    className="
                          w-full
                          mt-4
                          "
                  >
                    🚀 Evaluate My Answer
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

                <h2
                  className="
    text-2xl
    font-bold
    text-center
    mb-8
    "
                >
                  Interview Score
                </h2>

                <div
                  className="
    w-56
    h-56
    mx-auto
    "
                >

                  <CircularProgressbar
                    value={evaluation.score}
                    text={`${evaluation.score}%`}
                    styles={buildStyles({

                      pathColor:
                        evaluation.score >= 80
                          ? "#22c55e"
                          : evaluation.score >= 60
                            ? "#eab308"
                            : "#ef4444",

                      textColor:
                        "#ffffff",

                      trailColor:
                        "#27272a"

                    })}
                  />

                </div>

                <p
                  className="
    text-center
    text-zinc-400
    mt-6
    "
                >
                  AI Evaluation Result
                </p>

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

              <Card>

                <Button
                  onClick={
                    handleDownload
                  }
                >
                  📄 Download Interview Report
                </Button>

              </Card>
            </div>

          )
        }

      </PageContainer>

    </>


  );

}
