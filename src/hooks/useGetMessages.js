import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversion";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const getmessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://chattu-server.onrender.com/api/messages/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jwt: localStorage.getItem("jwt") }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("response data", data);
        setMessages(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getmessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
