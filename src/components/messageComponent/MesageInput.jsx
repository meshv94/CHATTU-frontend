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
      <div className="z-10 w-full mb-1 p-1 rounded-lg flex items-center">
  <form onSubmit={handleSubmit} className="flex items-center w-full">
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered w-4/5 rounded-l-lg focus:outline-none px-2 py-1 bg-gray-900 text-white"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button
      type="submit"
      className="btn mb-0 bg-transparent w-1/5 rounded-r-lg flex items-center justify-center hover:bg-sky-500"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/128/9187/9187575.png"
        alt="Send"
        width={40}
      />
    </button>
  </form>
</div>

    </>
  );
};
