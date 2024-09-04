import React, { useState } from "react";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import axios from "axios";

function ChatBot() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlefetchCoinDetails = async (prompt) => {
    setLoading(true);
    const API_URL ="https://cryptochatbotserver-production.up.railway.app";
    try {
      const { data } = await axios.post(`${API_URL}/ai/chat`, { prompt }, {
        withCredentials: true,
      });
      const response = { message: data.message, role: "model" };

      setResponses((prev) => [...prev, response]);

      console.log("success", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      
      const errorMessage = { message: "An error occurred. Please try again.", role: "model" };
      setResponses((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  console.log("response ", responses);

  return (
    <div className="chatbox blur-background large-shadow shadow-2xl shadow-white z-50 bg-[#000518] bg-opacity-70 w-[90vw] md:w-[70vw] lg:w-[40vw] pd-6 h-[85vh] rounded-lg ">
      <div className="h-[13%] pl-3 border-gray-700 flex gap-x-4 items-center">
        
        <div className="text-lg font-semibold">
          <h1>Ai chat Bot</h1>
          <p className="text-sm text-gray-400">Real time crypto market data</p>
        </div>
      </div>

      <div className="h-[77%]">
        {responses.length ? (
          <div className="flex flex-col py-5 px-5 overflow-y-auto h-full custom-scrollbar">
            {responses.map((item, index) =>
              item.role === "user" ? (
                <div className="self-end" key={index}>
                  <PromptMessage message={item.message} />
                </div>
              ) : (
                <div className="self-start" key={index}>
                  <ResponseMessage message={item.message} />
                </div>
              )
            )}
            {loading && <p>Fetching data from server...</p>}
          </div>
        ) : (
          <div>
            <div className="w-full">
            <img className="rounded-md w-[250px] h-[250px] mx-auto" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png" alt="Robot" width="25" height="25" />
            
            </div>
<div className="p-10 gap-5 h-full flex flex-col justify-center items-center">
            <p className="text-2xl font-bold">Welcome to crypto chatbot</p>
            <p className="text-gray-500">Inquire about the market data </p>
          </div>
          </div>
          
        )}
      </div>

      <div className="h-[10%] px-5 pb-2">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const data = { message: e.target.value, role: "user" };
              setResponses((prev) => [...prev, data]);
              handlefetchCoinDetails(e.target.value);
              e.target.value = ""; 
            }
          }}
          type="text"
          className="mb-3 h-full rounded-full border-gray-700 border bg-transparent px-5 w-full outline-none"
          placeholder="Give your prompt"
        />
      </div>
    </div>
  );
}

export default ChatBot;
