"use client";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  // Define the state variables for the email form
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [writing, setWriting] = useState(false);
  const [loading, setLoading] = useState(false);

  const chuckedArray = (arr, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  const writeWithAI = async () => {
    // Call the AI model to generate content
    // This function will be called when the user clicks the "Write with AI" button
    setLoading(true);
    const { data } = await axios.post("http://localhost:4000/ai/write", {
      prompt: "Write a email body only without subject about " + subject,
    });
    const text = data?.text;
    setLoading(false);
    setWriting(true);
    const textArray = text.split(" ");
    const chunks = chuckedArray(textArray, 1);
    let chunkedText = "";
    for (let i = 0; i < chunks.length; i++) {
      // Simulate async processing
      await new Promise((resolve) => setTimeout(resolve, 100));
      chunkedText += chunks[i].join(" ") + " ";
      setBody(chunkedText);
    }
    setWriting(false);
  };

  const sendMail = async () => {
    // Call the send email API
    // This function will be called when the user clicks the "Send" button
    try {
      await axios.post("http://localhost:4000/mail/sendmail", {
        to,
        subject,
        text: body,
      });
      setBody("");
      setSubject("");
      setTo("");
      toast.success("Email sent successfully", {
        type: "success",
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to send email", { type: "error", theme: "colored" });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="mt-10 w-[70%] flex flex-col justify-center items-center gap-5 mx-auto">
        <input
          type="text"
          placeholder="To:"
          className="input input-bordered bg-transparent w-full text-black text-xl"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject:"
          className="input input-bordered bg-transparent w-full text-black text-xl"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Body:"
          className="textarea textarea-bordered w-full bg-transparent h-[300px] text-black text-xl"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="tooltip tooltip-bottom" data-tip="Write with AI">
            <button className="btn btn-accent" onClick={writeWithAI}>
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : writing ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-magic"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />
                </svg>
              )}
            </button>
          </div>
          <button className="btn btn-info btn-wide" onClick={sendMail}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
