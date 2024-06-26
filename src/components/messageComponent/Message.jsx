import React from "react";
import useConversation from "../../zustand/useConversion";
import { extractTime } from "../../utils/extractTime";

export const Message = ({ message }) => {
  // console.log("andar aya kya", message);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { selectedConversation } = useConversation();
  // console.log('selected conversion' , selectedConversation)
  const fromMe = message.senderId === user._id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const avatar = fromMe ? user.avatar : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formatedTime = extractTime(message.createdAt);

  if (
    message.senderId === selectedConversation._id ||
    message.senderId === user._id
  ) {
    return (
      <>
        <div className={`chat ${chatClass} my-2`}>
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                alt="User Avatar"
                src={avatar}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            className={`chat-bubble ${bubbleBgColor} rounded-lg py-2 px-4 text-sm text-white shadow-md`}
          >
            {message.message}
          </div>
          <div className="chat-footer opacity-50 text-xs flex items-center p-1">
            {formatedTime}
          </div>
        </div>
      </>
    );
  }
};
