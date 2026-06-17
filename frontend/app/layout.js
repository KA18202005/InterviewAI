import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Toaster }
  from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InterviewAI",
  description:
    "AI Powered Career Assistant",
};

export default function RootLayout({
  children
}) {

  return (

    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
      `}
    >

      <body
        className="
        min-h-screen
        bg-black
        text-white
        overflow-x-hidden
        "
      >

        {/* Background Glow */}

        <div
          className="
          fixed
          inset-0
          -z-10
          "
        >

          <div
            className="
            absolute
            top-0
            left-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/20
            blur-[150px]
            "
          />

          <div
            className="
            absolute
            bottom-0
            right-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-600/20
            blur-[150px]
            "
          />

        </div>
        <Toaster
          position="top-right"
        />

        {children}

      </body>

    </html>

  );
}