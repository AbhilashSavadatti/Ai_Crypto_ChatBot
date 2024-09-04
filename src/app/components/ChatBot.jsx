import React, { useState, useEffect } from "react";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import axios from "axios";

function ChatBot() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  useEffect(() => {
    const words = ["Welcome to", "crypto chatbot"];
    let i = 0;
    let j = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Speed at which characters are typed
    const deletingSpeed = 50; // Speed at which characters are deleted
    const pauseDuration = 500; // Pause between typing and deleting a word
  
    const type = () => {
      let currentWord = words[i];
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, j - 1));
        j--;
        if (j === 0) {
          isDeleting = false;
          i++;
          if (i === words.length) {
            i = 0;
          }
        }
      } else {
        setTypewriterText(currentWord.substring(0, j + 1));
        j++;
        if (j === currentWord.length) {
          setTimeout(() => {
            isDeleting = true;
          }, pauseDuration);
        }
      }
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    };
  
    type();
  }, []);
  

  const handlefetchCoinDetails = async (prompt) => {
    setLoading(true);
    const API_URL = "https://cryptochatbotserver-production.up.railway.app";
    try {
      const { data } = await axios.post(
        `${API_URL}/ai/chat`,
        { prompt },
        {
          withCredentials: true,
        }
      );
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

  return (
    <div className="chatbox blur-background large-shadow shadow-2xl shadow-white z-50 bg-[#000518] bg-opacity-70 w-[90vw] md:w-[70vw] lg:w-[40vw] pd-6 h-[85vh] rounded-3xl">
      <div className="h-[13%] pl-3 border-gray-700 flex flex-col gap-x-4 items-center">
        <div className="mt-4 mx-auto text-lg font-semibold items-center">
          
<p class="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">Al-Chat Bot</p>

          </div>
          <div className="mx-auto text-lg font-semibold items-center">
          <p className="text-sm text-gray-400">Real-time crypto market data</p>
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
          <div className="w-full h-full flex flex-col justify-center items-center">
            
            <div className="mt-4 w-full h-full flex flex-col justify-center items-center">
            <img
              className="rounded-md w-[150px] h-[150px] mx-auto"
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png"
              alt="Robot"
              width="25"
              height="25"
            />
              <h1 id="typewriter" className="relative top-0 w-fit min-h-[100px] py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
                {typewriterText}
                
              </h1>
              <p className="text-gray-500">Inquire about the market data</p>
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
