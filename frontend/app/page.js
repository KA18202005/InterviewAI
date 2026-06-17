"use client";

import Link from "next/link";

export default function Home() {

  return (


    <main
      className="
  min-h-screen
  flex
  flex-col
  items-center
  "
    >

      {/* Hero Section */}

      <section
        className="
    max-w-6xl
    mx-auto
    px-6
    py-32
    text-center
    "
      >

        <div
          className="
      inline-block
      px-4
      py-2
      rounded-full
      bg-blue-500/10
      border
      border-blue-500/20
      text-blue-400
      mb-6
      "
        >
          AI Powered Career Assistant
        </div>

        <h1
          className="
      text-6xl
      md:text-7xl
      font-bold
      mb-6
      "
        >
          Ace Your Next
          <span
            className="
        bg-gradient-to-r
        from-blue-500
        to-purple-500
        bg-clip-text
        text-transparent
        "
          >
            {" "}Interview
          </span>
        </h1>

        <p
          className="
      text-xl
      text-zinc-400
      max-w-3xl
      mx-auto
      mb-10
      "
        >
          Analyze resumes, match jobs,
          generate cover letters,
          practice interviews and
          accelerate your career using AI.
        </p>

        <div
          className="
      flex
      justify-center
      gap-4
      "
        >

          <Link
            href="/signup"
            className="
        px-8
        py-4
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        transition
        "
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="
        px-8
        py-4
        rounded-xl
        border
        border-zinc-700
        hover:border-zinc-500
        transition
        "
          >
            Login
          </Link>

        </div>

      </section>

      {/* Features */}

      <section
        className="
    max-w-6xl
    mx-auto
    px-6
    pb-32
    "
      >

        <h2
          className="
      text-4xl
      font-bold
      text-center
      mb-16
      "
        >
          Everything You Need
        </h2>

        <div
          className="
      grid
      md:grid-cols-3
      gap-6
      "
        >

          <FeatureCard
            icon="📄"
            title="Resume Analysis"
            description="ATS score, strengths, weaknesses and project insights."
          />

          <FeatureCard
            icon="🎯"
            title="Job Match"
            description="Compare resumes with job descriptions and identify skill gaps."
          />

          <FeatureCard
            icon="🎤"
            title="Mock Interviews"
            description="Practice personalized interviews with AI evaluation."
          />

          <FeatureCard
            icon="✉️"
            title="Cover Letter"
            description="Generate professional cover letters instantly."
          />

          <FeatureCard
            icon="🗺️"
            title="Roadmaps"
            description="Get personalized learning plans for your target role."
          />

          <FeatureCard
            icon="📈"
            title="Progress Tracking"
            description="Monitor interview performance and resume improvements."
          />

        </div>

      </section>

      <section
        className="
  max-w-6xl
  mx-auto
  px-6
  pb-32
  "
      >

        <h2
          className="
    text-4xl
    font-bold
    text-center
    mb-16
    "
        >
          Why InterviewAI?
        </h2>

        <div
          className="
    grid
    md:grid-cols-4
    gap-6
    "
        >

          <StatCard
            number="95+"
            label="ATS Scores"
          />

          <StatCard
            number="1000+"
            label="Interview Questions"
          />

          <StatCard
            number="500+"
            label="Resume Analyses"
          />

          <StatCard
            number="24/7"
            label="AI Assistance"
          />

        </div>

      </section>

      <section
        className="
  max-w-6xl
  mx-auto
  px-6
  pb-32
  "
      >

        <h2
          className="
    text-4xl
    font-bold
    text-center
    mb-16
    "
        >
          How It Works
        </h2>

        <div
          className="
    grid
    md:grid-cols-4
    gap-6
    "
        >

          <StepCard
            number="1"
            title="Upload Resume"
            description="Analyze your resume using AI."
          />

          <StepCard
            number="2"
            title="Get Insights"
            description="Discover strengths and skill gaps."
          />

          <StepCard
            number="3"
            title="Practice"
            description="Take AI-powered mock interviews."
          />

          <StepCard
            number="4"
            title="Get Hired"
            description="Improve and apply confidently."
          />

        </div>

      </section>
      <footer
        className="
  border-t
  border-zinc-800
  py-10
  text-center
  text-zinc-500
  "
      >

        <p>
          © 2026 InterviewAI
        </p>

        <p className="mt-2">
          Built with Next.js, FastAPI and Gemini
        </p>

      </footer>
    </main>



  );

}

function FeatureCard({
  icon,
  title,
  description
}) {

  return (


    <div
      className="
  bg-zinc-900
  border
  border-zinc-800
  rounded-2xl
  p-6
  hover:border-blue-500
  transition
  "
    >

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3
        className="
    text-xl
    font-bold
    mb-3
    "
      >
        {title}
      </h3>

      <p className="text-zinc-400">
        {description}
      </p>

    </div>


  );



}

function StatCard({
  number,
  label
}) {

  return (

    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-8
      text-center
      "
    >

      <div
        className="
        text-5xl
        font-bold
        text-blue-400
        mb-3
        "
      >
        {number}
      </div>

      <div
        className="
        text-zinc-400
        "
      >
        {label}
      </div>

    </div>

  );

}

function StepCard({
  number,
  title,
  description
}) {

  return (

    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      "
    >

      <div
        className="
        h-12
        w-12
        rounded-full
        bg-blue-600
        flex
        items-center
        justify-center
        font-bold
        mb-4
        "
      >
        {number}
      </div>

      <h3
        className="
        text-xl
        font-bold
        mb-3
        "
      >
        {title}
      </h3>

      <p className="text-zinc-400">
        {description}
      </p>

    </div>

  );

}