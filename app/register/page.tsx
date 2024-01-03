"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaApple, FaLockOpen, FaTimes } from "react-icons/fa";
import Loader from "../components/loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        name,
        email,
        password,
      });
      console.log(response.data); // Success message or response from the backend
      // Redirect to the profile page upon successful registration
      router.push("/profile");
    } catch (error: any) {
      console.error(error?.response?.data); // Error message from the backend
      // Handle error or display error message to the user
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
            href="/login"
          >
            Sign In
          </Link>
        </header>

        <div className="flex text-white mb-6 items-center justify-center leading-tight">
          <img
            src="/sslogo.png"
            alt="SecretScribe Logo"
            className="bg-black w-10 h-10"
          />
          <h1 className="text-3xl my-4 font-thin font-marker">SecretScribe</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col ml-[15%] w-[70%]"
        >
          <input
            placeholder="Name"
            type="text"
            className="px-3 border-2 border-cream bg-green py-3 text-white focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            type="email"
            className="px-3 border-2 border-cream border-t-0 bg-green py-3 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="px-3 border-2 border-cream py-3 bg-green text-white border-t-0 focus:outline-none "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                Sign Up
              </>
            )}
          </button>
        </form>

        <section className="flex flex-col space-y-6 w-[70%] ml-[15%] mt-3 text-white font-extrabold font-lobster mb-5">
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

        <p className="mb-6 items-center text-sm justify-center flex font-serif">
          Educators: Register as an individual
        </p>
      </div>
    </div>
  );
};

export default Register;
