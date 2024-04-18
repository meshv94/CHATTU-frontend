import React from "react";

export const HeadBar = (selectedConversation) => {
  // console.log("head", selectedConversation);
  return (
    <>
      {/* <div className="navbar bg-base-100 z-10">
        <div className="w-11 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={selectedConversation.user.avatar}
          />
        </div>
        <div className="flex-1">
          <p className="text-xl ml-4 font-bold text-white">
            {selectedConversation.user.username}
          </p>
        </div>
      </div> */}
      <div className="navbar bg-sky-500 text-white flex items-center justify-between px-4 py-2 shadow-md">
  <div className="flex items-center">
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img
        alt="User Avatar"
        src={selectedConversation.user.avatar}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-lg ml-3 font-semibold">{selectedConversation.user.username}</p>
  </div>
</div>

    </>
  );
};
