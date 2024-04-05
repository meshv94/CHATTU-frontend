import React, { useEffect, useRef } from "react";
import { Message } from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { useListenMessageSocket } from "../../hooks/useListenMessageSocket";

export const Messages = (selectedConversation) => {
  const { messages, loading } = useGetMessages();
  const lastMessage = useRef();
  useListenMessageSocket(); // listen any incoming message from server using socket

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <>
      <div className="overflow-auto mb-20 mt-2 px-2">
        {!loading &&
          messages.length > 0 &&
          messages.map((item) => {            
            return (
              <div key={item._id} ref={lastMessage}>
                <Message message={item} />
              </div>
              )
          })}
        {!loading && messages.length === 0 && (
          <p className="text-center text-base text-yellow-600 bg-base-100 rounded-md p-1">
            Send a message to start the conversation. messages are safe with us.
            no one outside of this chat, not even chatAPP can read to them.
          </p>
        )}
      </div>
    </>
  );
};
