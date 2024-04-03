import React from "react";
import useConversation from "../../zustand/useConversion";
import { useSocketContext } from "../../context/SocketContext";

export const User = ({user}) => {
  // console.log("my id" , user);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const {onlineuser} = useSocketContext()
  const isOnline = onlineuser.includes(user._id)
  return (
    <>
      <div
        className={`flex flex-row hover:bg-sky-500 ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(user)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img src={user.avatar} />
          </div>
        </div>
        <h2 className="text-base ml-4 font-bold text-white">
          {user.username}
        </h2>
      </div>
    </>
  );
};
