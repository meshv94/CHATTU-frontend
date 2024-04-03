import React from "react";
import { SliderBar } from "../components/sliderbar/SliderBar";
import { MessageComponent } from "../components/messageComponent/MessageComponent";
import "../styles/home.css";

export const Home = () => {
  return (
    <>
      <div className="flex justify-between w-full box-content">
        <div className="sliderBar">
          <SliderBar />
        </div>
        <div className="messageComponent w-4/5">
          <MessageComponent />
        </div>
      </div>
    </>
  );
};
