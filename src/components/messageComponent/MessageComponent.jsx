import React, { useEffect, useState } from "react";
import { HeadBar } from "./HeadBar.jsx";
import { Messages } from "./Messages.jsx";
import { MesageInput } from "./MesageInput.jsx";
import useConversation from "../../zustand/useConversion.js";
// import { useAuth } from "../../store/store.js";

export const MessageComponent = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      {selectedConversation ? (
        <div className="flex flex-col h-screen align-middle">
          <HeadBar user={selectedConversation} />
          <Messages />
          <MesageInput />
        </div>
      ) : (
        <NoChatSelected />
      )}
    </>
  );
};

const NoChatSelected = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  return (
    <div className="flex items-center justify-center self-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-2xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user.username} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};
