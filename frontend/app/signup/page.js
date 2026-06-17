"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { signupUser } from "@/services/authService";

export default function SignupPage() {

const router = useRouter();

const [name, setName] =
useState("");

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [showPassword,
setShowPassword] =
useState(false);

const [loading,
setLoading] =
useState(false);

const handleSubmit = async (e) => {

 
e.preventDefault();

try {

  setLoading(true);

  await signupUser(
    name,
    email,
    password
  );

  toast.success(
    "Account Created Successfully 🎉"
  );

  router.push(
    "/login"
  );

} catch (error) {

  console.log(error);

  toast.error(
    error?.response?.data?.detail ||
    "Signup Failed"
  );

} finally {

  setLoading(false);

}
 

};

return (

 
<div
  className="
  min-h-screen
  flex
  items-center
  justify-center
  px-6
  relative
  overflow-hidden
  "
>

  {/* Background Blobs */}

  <div
    className="
    absolute
    w-96
    h-96
    bg-blue-500/20
    blur-3xl
    rounded-full
    -top-20
    -left-20
    "
  />

  <div
    className="
    absolute
    w-96
    h-96
    bg-purple-500/20
    blur-3xl
    rounded-full
    bottom-0
    right-0
    "
  />

  {/* Signup Card */}

  <div
    className="
    w-full
    max-w-md
    bg-zinc-900/70
    backdrop-blur-xl
    border
    border-zinc-800
    rounded-3xl
    p-8
    shadow-2xl
    relative
    z-10
    "
  >

    <div className="text-center mb-8">

      <h1
        className="
        text-4xl
        font-bold
        bg-gradient-to-r
        from-blue-500
        to-purple-500
        bg-clip-text
        text-transparent
        "
      >
        InterviewAI
      </h1>

      <p
        className="
        text-zinc-400
        mt-3
        "
      >
        Create Your Account 🚀
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="
        w-full
        p-4
        rounded-xl
        border
        border-zinc-700
        bg-zinc-950
        outline-none
        focus:border-blue-500
        "
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="
        w-full
        p-4
        rounded-xl
        border
        border-zinc-700
        bg-zinc-950
        outline-none
        focus:border-blue-500
        "
      />

      <div className="relative">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          w-full
          p-4
          rounded-xl
          border
          border-zinc-700
          bg-zinc-950
          outline-none
          focus:border-blue-500
          pr-12
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-zinc-400
          "
        >

          {
            showPassword
              ? <EyeOff size={18}/>
              : <Eye size={18}/>
          }

        </button>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="
        w-full
        py-4
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        transition
        font-semibold
        "
      >

        {
          loading ? (

            <div
              className="
              flex
              items-center
              justify-center
              gap-2
              "
            >

              <div
                className="
                h-4
                w-4
                border-2
                border-white
                border-t-transparent
                rounded-full
                animate-spin
                "
              />

              Creating Account...

            </div>

          ) : (

            "Create Account"

          )
        }

      </button>

    </form>

    <p
      className="
      text-center
      mt-6
      text-zinc-400
      "
    >

      Already have an account?

      <Link
        href="/login"
        className="
        text-blue-400
        ml-2
        "
      >
        Login
      </Link>

    </p>

  </div>

</div>
 

);

}
