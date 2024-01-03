import Link from "next/link";
import React from "react";
// import { useState } from "react";

// import { FiMenu } from 'react-icons/fi';

const LandingPage = () => {

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleMenuToggle = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };


  return (
    <div className="bg-green text-cream min-h-screen">
      <div className="h-[95vh]">

      <header className="px-4 py-4 flex justify-between items-center sm:px-8 md:px-16 lg:px-60 shadow-[rgba(0,0,0,0.5)_7px_5px_3px_0px] fixed w-full bg-green z-40">
          <div className="flex items-center">
            <img src="/sslogo.png" alt="SecretScribe Logo" className="hidden md:block w-16 h-16 lg:block bg-gray-800" />
            <h1 className="hidden sm:block text-5xl font-extrabold font-marker">ecretScribe</h1>
          </div>
          <nav className="font-mono hidden sm:block">
            <ul className="flex justify-end space-x-8">
              <li>
                <Link
                  className="text-lg font-medium text-cream hover:text-white hover:underline"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-lg font-medium text-cream hover:text-white hover:underline"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-lg font-medium text-cream hover:text-white hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className="pt-20 sm:px-8 md:px-16 lg:px-60">
          <img
            src="/ss.png"
            alt="cartoon phone"
            className="mt-10 h-[55vh] mx-auto"
          />
          <div>
            <p className="text-center mt-16 text-3xl font-poppins">Anonymously</p>
            <p className="mt-6 text-7xl font-extrabold font-marker text-cream text-center">
              Share Thoughts, and Confessions In Secrets.
            </p>
          </div>
        </section>
      </div>
     
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-60 bg-cream text-gray-800">
        <h2 className="text-5xl font-extrabold font-abril pb-20 leading-relaxed">
          SecretScribe is an interactive anonymous messaging app. Create your Profile Link and Send it to all your contacts to check what do your friends think about you. SecretScribe is free!
        </h2>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="mr-0 sm:mr-40">
            <ul className="text-xl font-mono leading-relaxed sm:w-[35vw]">
              <li className="mb-4">
                Express yourself freely without revealing your identity, Discover and connect with anonymous messages from others.
              </li>
              <li className="mb-4">Explore different categories and topics, Join a community where secrets are shared and understood</li>
            </ul>
            <Link href="/register" className="hover:bg-green hover:text-cream py-2 mt-10 text-green px-8 font-mono text-lg border-2 border-green">
              Get Started
            </Link>
          </div>
          <img src="/faceoff.png" alt="face Off" className="w-44 h-44 sm:w-96 sm:h-96" />
        </div>
      </section>

      <section className="text-center py-14 border-b overflow-x-hidden">
        <p className="text-4xl font-marker text-white font-extrabold mb-4 animate-slide-in-right">
          Type your message anonymously, Submit your message and let others discover it, Choose a category for your message,.
        </p>
      </section>

      <footer className="py-6 text-center flex justify-between font-mono text-white px-4 sm:px-8 md:px-16 lg:px-60">
        <p>&copy; 2023 Secretscribe. All rights reserved.</p>
        <p>Created by D&R</p>
      </footer>
    </div>
  );
};

export default LandingPage;