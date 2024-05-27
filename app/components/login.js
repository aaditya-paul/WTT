"use client";
//  TODO FIX SVG RESIZING
import React, {use, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faUser} from "@fortawesome/free-regular-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import {
  getAuth,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {app} from "@/firebase";
import InfoModal from "./utils/infoModal";
import GithubBTN from "./SignInButtons";
import {userStore} from "./utils/authState";

function SignUp() {
  const [PassView, setPassView] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const auth = getAuth();
  const provider = new GithubAuthProvider();

  // email handle click
  const handleEmailLoginClick = () => {
    if (email !== "" && password !== "") {
      setError(false);
      handleEmailLogin();
    } else {
      setError(true);
      setErrorDetails("Fill all the fields first !");
    }
  };

  // handling email login used in handle click

  const handleEmailLogin = async () => {
    try {
      // signing in the user
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // watches for errors and sets it
      setError(true);
      // sets error state to be displayed in the modal

      if (e.code == "auth/invalid-credential") {
        setErrorDetails(
          "The email or password you entered is an invalid, Please check and try again !"
        );
      } else if (e.code == "auth/weak-password") {
        setErrorDetails(
          "The password entered must be a minimum of 6 characters."
        );
      } else if (e.code == "auth/email-already-in-use") {
        setErrorDetails("The email entered is already in use, try logging in.");
      } else {
        setErrorDetails(e.code);
      }
      // console.log(e);
    }
  };

  const handleGithubLoginClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log(user);
        // userStore.dispatch(addUser(user));
        // userStore.dispatch(addUserDetails(user));
      })
      .catch((e) => {
        setErrorDetails(
          "There was some error in authenticating, Please try again later !"
        );
      });
  };
  return (
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
        <div className="lg:w-[400px] md:w-[350px] md:min-w-[300px] w-[90vw]  md:h-[480px] lg:h-[500px] h-[500px] border-2 border-lime-900 rounded-md flex flex-col items-center">
          <div className=" self-start mx-4 mt-5 text-2xl font-bold text-lime-800">
            <p className="">Welcome Back!</p>
          </div>

          {/* //? email */}
          <div className="p-4 pb-2  w-full flex">
            <input
              placeholder="Email"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 rounded-md border-2 outline-none border-lime-600 border-r-0 rounded-r-none text-lime-500 placeholder-lime-500 w-full bg-[#f4f5f7]"
            />
            <FontAwesomeIcon
              className="w-5 h-[93%] text-lime-700   pr-2 border-2 rounded-md border-lime-600 border-l-0 rounded-l-none"
              icon={faAt}
            />
          </div>
          {/* //? password */}
          <div className="p-4 pb-2  w-full flex">
            <input
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={PassView ? "text" : "password"}
              className="p-2 rounded-md border-2 outline-none border-lime-600 border-r-0 rounded-r-none text-lime-500 placeholder-lime-500 w-full bg-[#f4f5f7]"
            />
            <div
              className=" cursor-pointer"
              onClick={() => {
                setPassView(!PassView);
              }}
            >
              <FontAwesomeIcon
                className="w-5 h-[93%] text-lime-700   pr-2 border-2 rounded-md border-lime-600 border-l-0 rounded-l-none"
                icon={PassView ? faEye : faEyeSlash}
                // icon={faEye}
              />
            </div>
          </div>

          {/* //? SUBMIT BTN */}
          <div className="p-4 pb-2  w-full flex flex-col">
            <div
              onClick={handleEmailLoginClick}
              className="p-4 active:scale-90 rounded-xl cursor-pointer bg-lime-700 text-white transition-all ease-linear  border-2 outline-none border-lime-700 font-semibold text-lg   placeholder-lime-500 w-full"
            >
              <p className=" text-center">Login</p>
            </div>
            <div className="pt-3 w-full">
              <p className=" text-end mb-5">
                <Link className=" text-lime-700 " href={"/forgot-password"}>
                  Forgot Password ?
                </Link>
              </p>
              <GithubBTN handleClick={handleGithubLoginClick} />
              <p className=" text-center">
                Dont have an account?{" "}
                <Link className=" text-lime-500" href={"/signup"}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <InfoModal error={error} errorDetails={errorDetails} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
