"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signupUser } from "@/services/authService";

export default function SignupPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await signupUser(
                name,
                email,
                password
            );

            alert("Account Created Successfully");

            router.push("/login");

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.detail ||
                "Signup Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 border rounded-lg shadow"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Signup
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-3 mb-4 rounded"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="w-full bg-black text-white p-3 rounded"
                    disabled={loading}
                >

                    {
                        loading
                            ? "Creating Account..."
                            : "Signup"
                    }

                </button>
                <p className="mt-4 text-center">
                    Already have an account?
                    <a
                        href="/login"
                        className="text-blue-600 ml-1"
                    >
                        Login
                    </a>
                </p>

            </form>

        </div>
    );
}