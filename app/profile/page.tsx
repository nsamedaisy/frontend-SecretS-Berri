"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { nanoid } from "nanoid";
import {
  FaArrowRight,
  FaRegCopy,
  FaWhatsapp,
  FaFacebookSquare,
  FaEnvelope,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import Loader from "../components/loader";

interface Profile {
  name: string;
}


const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  // Initialize profile as null or with an appropriate type

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile");
        const data = response.data;

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);


  // Generate the unique profile link (you can use a library like nanoid)
  const profileLink = `https://example.com/profile/${nanoid()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileLink)
      .then(() => {
        console.log("Profile link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying profile link:", error);
      });
  };
  
  const handleShareOnWhatsApp = () => {
    // Logic to open WhatsApp with the profile link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      profileLink
    )}`;
    window.open(whatsappUrl);
  };

  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[30%] sm:w-[30%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-tr from-cream to-green items-center flex flex-col">
        <h1 className="text-5xl font-extrabold font-sans items-center">
          {profile ? `${profile.name}'s Profile` : <Loader />}
        </h1>

        <div className="flex justify-center items-center">
          <Link
            href={profileLink}
            className="flex items-center text-lg py-6 font-bold"
          >
            Generated Link
          </Link>
          <button
            className="flex rounded-md justify-center py-2 pl-4"
            onClick={handleCopyLink}
          >
            <FaRegCopy className="w-6 h-6 mr-3" />
          </button>
        </div>

        {profile && (
          <p className="font-semibold w-[20vw]">
            Share your profile link ❤️ to get responses from your friends ❤️. Go
            to "View Messages" to check out the responses. 👌
          </p>
        )}

        <section className="flex flex-col space-y-6 mt-8 text-white font-extrabold font-lobster mb-5">
          <Link
            href="/viewMessages"
            className="flex rounded-md justify-center bg-gradient-to-tr from-green to-cream items-center w-[20vw] border-2 border-green py-2 pl-4"
          >
            View Messages <FaArrowRight className="ml-3" />
          </Link>

          <button
            className="flex rounded-md justify-center bg-red-700 py-2 pl-4"
            onClick={() => window.open(`mailto:?body=${profileLink}`)}
          >
            <FaEnvelope className="w-6 h-6 mr-3" /> Share On Mail
          </button>

          {profile && (
            <button
              className="flex rounded-md justify-center bg-watGreen py-2 pl-4"
              onClick={handleShareOnWhatsApp}
            >
              <FaWhatsapp className="w-6 h-6 mr-3" /> Share on WhatsApp
            </button>
          )}

          <button
            className="flex rounded-md justify-center bg-blue-950 py-2 pl-4"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${profileLink}`
              )
            }
          >
            <FaFacebookSquare className="w-6 h-6 mr-3" /> Share on Facebook
          </button>
        </section>

        <p className="border-b-4 my-6 w-[20vw]"></p>

        <button className="flex rounded-md my-6 justify-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2 pl-4">
          Settings
          <FiSettings className="w-5 h-5 ml-3" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
