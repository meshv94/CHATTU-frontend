import React, { useState } from "react";
import useConversation from "../../zustand/useConversion";

export const MesageInput = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const [text, setText] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(text)
    sendMessage(text);
    // console.log(selectedConversation);
    setText("");
  };

  const sendMessage = async (text) => {
    try {
      const res = await fetch(
        `https://chattu-server.onrender.com/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            jwt: localStorage.getItem("jwt"),
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        // console.log("send message" , data);
        setMessages([...messages, data]);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="z-10 w-full mb-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-4/5 rounded-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-outline btn-info w-1/5 rounded-none"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};
