"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { API_URL } from "../_core/components/constant";
import Loader from "../_core/components/loader";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

interface Message {
  content: string;
  timeSent: string;
}

const ViewSecretMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfMessages, setIsEndOfMessages] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null); // Declare socket using useState

  const [displayedMessages, setDisplayedMessages] = useState(3);
  const messagesPerPage = 5;

  useEffect(() => {
    const socket = io(API_URL); // Create a socket connection

    // Listen for the "message" event from the server
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages]); // Add the new message to the beginning of the messages array
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when the component is unmounted
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(API_URL + "/api/messages");
        const data = response.data;
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
          setIsEndOfMessages(data.messages.length === 0);
          setShowLoadMore(data.messages.length > messagesPerPage);
        } else {
          console.error("Invalid response: messages is not an iterable", data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + "/api/messages/load");
      console.log(response.data); // Log the server response
      const data = response.data;
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setMessages((prevMessages) => [...prevMessages, ...data]);
          setDisplayedMessages((prevDisplayedMessages) => prevDisplayedMessages + messagesPerPage);
        }
        if (data.length < messagesPerPage) {
          setIsEndOfMessages(true);
        }
        setShowLoadMore(data.length > messagesPerPage);
      } else {
        console.error("Invalid response: messages is not an iterable", data);
      }
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
          {messages.length > 0 ? (
            <>
              {messages.slice(0, displayedMessages).map((message, index) => (
                <fieldset
                  className="border-2 border-white rounded p-4 mt-4"
                  key={index}
                >
                  <legend className="text-xs font-semibold">
                    Message {index + 1}:
                  </legend>
                  <p className="text-base font-bold text-white">
                    {message.content}
                  </p>
                  <p className="text-sm mt-4">_anonymous {message.timeSent}</p>
                  <button className="border rounded-xl mt-3 py-1">
                    ✨ Share response ✨
                  </button>
                </fieldset>
              ))}
              {showLoadMore && displayedMessages < messages.length && (
                <button
                  className="flex rounded-xl my-6 justify-center items-center bg-gradient-to-tr from-green to-cream w-[20vw] border-2 border-green py-2"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Load More"}
                </button>
              )}
              {isEndOfMessages && messages.length === 0 && (
                <fieldset className="border-2 border-red-600 text-red-700 font-bold rounded p-3 mt-3">
                  <p>
                    Sorry 😔 You haven't received any messages in the past 48
                    hours. Share your link with your friends to get secret
                    message(s).
                  </p>
                </fieldset>
              )}
            </>
          ) : (
            <>
              {isEndOfMessages && messages.length === 0 && (
                <fieldset className="border-2 border-red-600 text-red-700 font-bold rounded p-3 mt-3">
                  <p>
                    Sorry 😔 you haven't received any messages. Share your link
                    with your friends to get secret message(s).
                  </p>
                </fieldset>
              )}
              {isEndOfMessages && messages.length > displayedMessages && (
                <fieldset className="border-2 border-cream text-green font-bold rounded p-3 mt-3">
                  <p>
                    You have reached the end! 🏁 🙋 Ask your friends to send
                    more messages or view Archived Messages.
                  </p>
                </fieldset>
              )}
            </>
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
