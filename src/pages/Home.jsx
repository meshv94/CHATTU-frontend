import React, { useEffect } from "react";
import { SliderBar } from "../components/sliderbar/SliderBar";
import { MessageComponent } from "../components/messageComponent/MessageComponent";
import "../styles/home.css";
import { useSocketContext } from "../context/SocketContext";

export const Home = () => {
  const { connectSocket } = useSocketContext();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    connectSocket(user)
  }, []);
  
  return (
    <>
        {/* <header className="w-full h-15 bg-base-100 flex"> */}
          {/* <h2 className="text-xl italic font-bold text-blue-100 self-center ml-3">ChatApp</h2> */}
        {/* </header> */}

      
      <div className="flex flex-col lg:flex-row justify-between w-full h-full">
          <SliderBar />
          <MessageComponent />
      </div>
    </>
  );
};
