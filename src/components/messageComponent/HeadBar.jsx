import React from "react";

export const HeadBar = (selectedConversation) => {
  // console.log("head", selectedConversation);
  return (
    <>
      <div className="navbar bg-base-100 z-10">
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
        {/* <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-60"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};
