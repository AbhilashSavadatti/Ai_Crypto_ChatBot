import React, { useEffect, useState } from 'react'

function PromptMessage({message}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    updateTime(); // Set the initial time
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);
  return (
    <>
    
    <div className="flex items-start gap-2.5">
  <img
    className="w-10 h-10 rounded-full"
    src="https://cdn.pixabay.com/photo/2012/04/11/16/33/masked-28806_1280.png"
    alt="Jese image"
  />
  <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        Anoynamus
      </span>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
      {currentTime}
      </span>
    </div>
    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
      {message}
    </p>
   
  </div>
  
</div>

    </>
  )
}

export default PromptMessage