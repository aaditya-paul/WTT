import React from "react";
import {getAuth, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "@/firebase";

const auth = getAuth();
const provider = new GithubAuthProvider();

function GithubBTN() {
  const handleGithubLoginClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div
      onClick={handleGithubLoginClick}
      className=" cursor-pointer hover:bg-lime-700 transition-all ease-linear hover:text-white text-center my-5 p-5 border-2 border-lime-700 rounded-md text-lime-700"
    >
      <div>Sign In Using Github</div>
    </div>
  );
}

export default GithubBTN;
