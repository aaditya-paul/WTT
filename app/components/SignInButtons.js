import React from "react";

function GithubBTN({handleClick}) {
  return (
    <div
      onClick={handleClick}
      className=" cursor-pointer hover:bg-lime-700 transition-all ease-linear hover:text-white text-center my-5 p-5 border-2 border-lime-700 rounded-md text-lime-700"
    >
      <div>Sign In Using Github</div>
    </div>
  );
}

export default GithubBTN;
