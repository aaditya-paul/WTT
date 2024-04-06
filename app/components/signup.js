"use client";
//  TODO FIX SVG RESIZING
import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faUser} from "@fortawesome/free-regular-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "@/firebase";
import InfoModal from "./utils/infoModal";

function SignUp() {
  const [ConfirmPassView, setConfirmPassView] = useState(false);
  const [PassView, setPassView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const auth = getAuth();
  const handleClick = () => {
    if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
      setError(false);
      if (password == confirmPass) {
        handleSignUp();
      } else {
        setError(true);
        setErrorDetails(
          "The password and the confirm password fields don't match check and try again !"
        );
      }
    } else {
      setError(true);
      setErrorDetails("Fill all the fields first !");
    }
  };
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(true);
      if (e.code == "auth/invalid-email") {
        setErrorDetails(
          "The email you entered is an invalid email, Please check and try again !"
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
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-evenly items-center h-[100vh]">
      {/* //* side details  */}
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
      {/* //* form */}
      <div className="p-5 md:p-0">
        <div className="lg:w-[400px] md:w-[350px] md:min-w-[300px] w-[90vw]  md:h-[480px] lg:h-[500px] h-[500px] border-2 border-lime-900 rounded-md flex flex-col items-center">
          <div className=" self-start mx-4 mt-5 text-2xl font-bold text-lime-800">
            <p className="">Create Account</p>
          </div>
          {/* //? name */}
          <div className="p-4 pb-2  w-full flex">
            <input
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="p-2 rounded-md border-2 outline-none border-lime-600 border-r-0 rounded-r-none text-lime-500 placeholder-lime-500 w-full bg-[#f4f5f7]"
            />
            <FontAwesomeIcon
              className="w-5 h-[93%] text-lime-700   pr-2 border-2 rounded-md border-lime-600 border-l-0 rounded-l-none"
              icon={faUser}
            />
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
              type={PassView ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
          {/* //? confirm password */}
          <div className="p-4 pb-2  w-full flex">
            <input
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
              type={ConfirmPassView ? "text" : "password"}
              className="p-2 rounded-md border-2 outline-none border-lime-600 border-r-0 rounded-r-none text-lime-500 placeholder-lime-500 w-full bg-[#f4f5f7]"
            />
            <div
              className=" cursor-pointer"
              onClick={() => {
                setConfirmPassView(!ConfirmPassView);
              }}
            >
              <FontAwesomeIcon
                className="w-5 h-[93%] text-lime-700   pr-2 border-2 rounded-md border-lime-600 border-l-0 rounded-l-none"
                icon={ConfirmPassView ? faEye : faEyeSlash}
                // icon={faEye}
              />
            </div>
          </div>
          {/* //? SUBMIT BTN */}
          <div className="p-4 pb-2  w-full flex flex-col">
            <div
              onClick={handleClick}
              className="p-4 rounded-xl cursor-pointer bg-lime-700 text-white transition-all ease-linear  border-2 outline-none border-lime-700 font-semibold text-lg   placeholder-lime-500 w-full"
            >
              <p className=" text-center">Create Account</p>
            </div>
            <div className="pt-3 w-full">
              <p className=" text-center">
                Already have an account?{" "}
                <Link className=" text-lime-500" href={"/login"}>
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* //* error modal */}

      <InfoModal error={error} errorDetails={errorDetails} />
    </div>
  );
}

export default SignUp;
