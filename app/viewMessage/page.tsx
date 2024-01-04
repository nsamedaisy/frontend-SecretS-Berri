"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { API_URL } from "../components/constant";
import Loader from "../components/loader";

interface Message {
  content: string;
  timeSent: string;
}

const ViewSecretMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfMessages, setIsEndOfMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(API_URL + "/api/messages");
        const data = response.data;
        setMessages(data.messages);
        setIsEndOfMessages(data.messages.length === 0);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [messages]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + "/api/messages");
      const data = response.data;
      setMessages((prevMessages) => [...prevMessages, ...data.messages]);
      setIsEndOfMessages(data.messages.length === 0);
    } catch (error) {
      console.error("Error loading more messages:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen flex items-center justify-center">
      <div className="w-[30%] sm:w-[30%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-tr from-cream to-green items-center flex flex-col">
        <h1 className="text-4xl font-extrabold text-cream items-center">
          My SecretScribe 😅
        </h1>
        <p className="font-semibold w-[20vw] my-4">
          👇 Look 👇 down or check 👇 out the messages that you have received
        </p>

        <div className="w-[20vw]">
          <div>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <fieldset
                  className="border-2 border-gray-300 rounded p-4 mt-4"
                  key={index}
                >
                  <legend className="text-xs font-semibold">
                    Message {index + 1}:
                  </legend>
                  <p className="text-base">{message.content}</p>
                  <p className="text-sm mt-4">_anonymous {message.timeSent}</p>
                  <button className="border rounded-xl mt-3 py-1">
                    ✨ Share response ✨
                  </button>
                </fieldset>
              ))
            ) : (
              <fieldset className="border-2 hidden border-red-600 text-red-700 font-bold rounded p-3 mt-3">
                <p>
                  Sorry 😔 You haven't received any messages in the past 48
                  hours. Share your link with your friends to get secret
                  message(s).
                </p>
              </fieldset>
            )}
          </div>

          {isEndOfMessages ? (
            <fieldset className="border-2 border-cream text-green font-bold rounded p-3 mt-3">
              <p>
                You Have Reached The End! 🏁 🙋 Ask your friends to send more
                messages or view Archived Messages.
              </p>
            </fieldset>
          ) : (
            <button
              className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {/* <img src="/time.png" alt="time logo" className="w-8 h-6 mr-3" /> */}
              {isLoading ? <Loader /> : "Load More"}
            </button>
          )}

          {isEndOfMessages && messages.length === 0 && (
            <fieldset className="border-2 border-red-600 text-red-700 font-bold rounded p-3 mt-3">
              <p>
                Sorry 😔 you haven't received any messages. Share your link with
                your friends to get secret message(s).
              </p>
            </fieldset>
          )}
        </div>

        <p className="border-b-2 w-[20vw]"></p>

        <Link
          href="/profile"
          className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2 pl-4"
        >
          Go back
          <FaArrowLeft className="ml-3" />
        </Link>
      </div>
    </div>
  );
};

export default ViewSecretMessage;

{
  /* 
import React from "react";
import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";

const viewSecretMessage = () => {
  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[30%] sm:w-[30%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-tr from-cream to-green items-center flex flex-col">
        <h1 className="text-5xl font-extrabold text-cream items-center">
          My SecretScribe 😅{" "}
        </h1>
        <p className="font-semibold w-[20vw] my-4">
          👇 Scroll 👇 down or check 👇 out the messages that you have received
        </p>

        <div className="w-[20vw]">
          <fieldset className="border-2 border-cream rounded p-4">
            <legend className="text-sm font-semibold">Messages:</legend>
            <div className="flex  flex-col mt-2">
              <p className="text-base">I know so well what you can do thats why i cant tell you this to your face</p>
              <p className="text-sm mt-4">_anonymous Time sent</p>
              <button className="border rounded-xl mt-3 py-1">
              ✨ Share response ✨
              </button>
            </div>
          </fieldset>

          <fieldset className="border-2 border-cream text-green font-bold rounded p-3 mt-3">
            <p>
              You Have Reached The End! 🏁 🙋 Ask your friends to send more
              messages or view Archived Messaged
            </p>
          </fieldset>

          <fieldset className="border-2 hidden border-red-600 text-red-700 font-bold rounded p-3 mt-3">
            <p> Sorry 😔 you haven't recieve any message in the past 48hours. Share your link to yours friends to get secret message(s)</p>
          </fieldset>
        </div>

        <button className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2">
          <img src="/time.png" alt="time logo" className="w-8 h-6 mr-3" />
          Load More
        </button>

        <p className="border-b-2 w-[20vw]"></p>

        <Link
          href="/profile"
          className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2 pl-4"
        >
          Go back
          <FaArrowLeft className="ml-3" />
        </Link>
      </div>
    </div>
  );
};

export default viewSecretMessage; */
}
