import React, { useState } from "react";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import axios from "axios";

// [
//   {message:"prompt",role:"user"},
//   {message:"response model",role:"model"},

// ]
function ChatBot() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlefetchCoinDetails = async (prompt) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5454/ai/chat", {
        prompt,
      });
      const response = { message: data.message, role: "model" };
     

      setResponses((prev) => [...prev, response]);

      console.log("success", data);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  console.log("response ", responses);

  return (
    <div className="chatbox blur-background large-shadow shadow-2xl shadow-purple-500 z-50 bg-[#000518] bg-opacity-70 w-[90vw] md:w-[70vw] lg:w-[40vw] pd-6 h-[85vh]">
      <div className="h-[13%] pl-3 border-gray-700 flex  gap-x-4 items-center">
        <img
          className="rounded-full w-12 h-12"
          src="https://media.istockphoto.com/id/1534040386/photo/an-outdoor-bamboo-gazebo-nestled-amidst-lush-greenery-offering-serene-relaxation-after-a.webp?b=1&s=612x612&w=0&k=20&c=vuWY9Cw4TjBDhJLyMVL20Qm5gddDNQ3UmHATP_s2Xvw="
          alt=""
        />

        <div className="text-lg font-semibold">
          <h1>Ai chat Bot</h1>
          <p className="text-sm text-gray-400">Real time crypto market data</p>
        </div>
      </div>

      <div className="h-[77%] ">
        {responses.length ?<div className="flex flex-col py-5 px-5 overflow-y-auto h-full custom-scrollbar">
          {responses.map((item, index) =>
            item.role == "user" ? (
              <div className="self-end" key={index}>
                <PromptMessage message={item.message} />
              </div>
            ) : (
              <div className="self-start" key={index}>
                <ResponseMessage message={item.message} />
              </div>
            )
          )}
          {loading && <p> fetching data from server...</p>}
        </div> :  <div className="p-10 gap-5 h-full flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">Welcome to crypto chatbot</p>
          <p className="text-gray-500 ">Inquire about market data</p>
        </div>}
       
      </div>

      <div className="h-[10%] px-5">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const data = { message: e.target.value, role: "user" };
              setResponses((prev) => [...prev, data]);
              handlefetchCoinDetails(e.target.value);
            }
          }}
          type="text"
          className="h-full rounded-full border-gray-700 border bg-transparent px-5 w-full outline-none"
          placeholder="give your prompt"
        />
      </div>
    </div>
  );
}

export default ChatBot;
