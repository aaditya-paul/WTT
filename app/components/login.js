"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import InfoModal from "./utils/infoModal";
import GithubBTN from "./SignInButtons";
import AuthStateCheck from "./utils/AuthStateCheck";

function SignUp() {
  const [PassView, setPassView] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  return (
    <>
      <AuthStateCheck redirectRoute={"/"} />
      <div className="flex flex-col sm:flex-row justify-evenly items-center h-[100vh]">
        <div className=" flex flex-col  items-center md:items-start">
          <div className="relative md:w-24 md:h-24 w-20 h-20 ">
            <Link href={"/"}>
              <Image objectFit="contain" fill alt="logo" src={Logo} />
            </Link>
          </div>
          <div className=" ">
            <p className=" text-center md:text-left text-2xl md:text-3xl lg:text-5xl font-ubuntu text-slate-800 font-semibold">
              Your Digital <br />
              <span className=" font-doasis font-bold text-lime-600">
                Task Management <br />
              </span>
              Site
            </p>
            <p className=" text-slate-700 text-lg md:text-sm lg:text-lg  mt-2 ">
              Control workflow in the most efficient way.
            </p>
          </div>
        </div>
        <div className="p-5 md:p-0">
          <div className=" w-[25vw]">
            <GithubBTN />
          </div>
          <InfoModal error={error} errorDetails={errorDetails} />
        </div>
      </div>
    </>
  );
}

export default SignUp;
