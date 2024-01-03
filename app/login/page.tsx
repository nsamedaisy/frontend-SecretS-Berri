"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { API_URL } from "../components/constant";


import { FaApple, FaEnvelope, FaFacebookF, FaLockOpen, FaTimes } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(API_URL + "/auth/login", { email, password });
      // Assuming the backend response contains a success message or token
      if (response.data.success) {
        router.push("/profile");
      } else {
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-green to-cream text-black min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[25%] sm:w-[25%] h-[45%] bg- py-10 shadow-2xl px-9 bg-gradient-to-tr from-cream to-green">
        <header className="flex justify-between pb-6 items-center">
        <Link href="/" className="text-xl">
            <FaTimes />
          </Link>
          <Link
            className="text-lg font-bold text-cream hover:underline"
            href="/register"
          >
            Sign Up
          </Link>
        </header>

        <div className="flex items-center justify-center leading-tight">
          <img
            src="/sslogo.png"
            alt="SecretScribe Logo"
            className="bg-black w-10 h-10"
          />
          <h1 className="text-3xl font-thin font-marker">ecretScribe</h1>
        </div>

        <h1 className="py-6 text-5xl font-marker items-center justify-center flex font-bold">
          Welcome back
        </h1>

        <section className="flex flex-col space-y-6 w-[60%] ml-[20%] mt-8 text-white font-extrabold font-lobster mb-5">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
            className="px-3 border-2 border-cream bg-green py-3 text-white focus:outline-none"
            value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
            className="px-3 border-2 border-cream border-t-0 bg-green py-3 text-white focus:outline-none"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
            type="submit"
            className="flex items-center justify-center mt-4 border-2 border-green py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <FaLockOpen className="w-5 h-5 mr-3 text-red-700" />
                 Login
              </>
            )}
          </button>
          </form>

          <p className="flex justify-center items-center py-2">
            <span className="border-b flex-grow"></span>
            <span className="px-3 text-gray-500 font-bold">Or</span>
            <span className="border-b flex-grow"></span>
          </p>


          <button className="flex items-center border-2 border-green py-2 pl-4">
            <img src="/google.png" alt="Google logo" className="w-8 h-8 mr-3" />{" "}
            Sign In with Google
          </button>
          <button className="flex items-center border-2 border-green py-2 pl-4">
            <FaApple className="w-6 h-6 mr-3 text-blue-700" /> Sign In with
            Apple
          </button>
        </section>
      </div>
    </div>
  );
};

export default Login;
