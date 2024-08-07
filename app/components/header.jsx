"use client ";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import themeToggler from "../../public/assets/icons/themeToggler.svg";
import notify from "../../public/assets/icons/notification_2645897.png";
import Logo from "../../public/logo.png";
import Link from "next/link";
import {useSelector} from "react-redux";
import AuthStateCheck from "./utils/AuthStateCheck";
import LoadingComponent from "./loadingComponent";
import userImage from "../../public/assets/icons/user.png";
import LoadingScreen from "./loadingScreen";

function Header() {
  const uid = useSelector((state) => state.authState.uid);
  const user = useSelector((state) => state.authState.user);
  const name = user.displayName;
  // console.log(user);
  if (user) {
    return (
      <>
        <AuthStateCheck />
        <div className="w-full h-auto lg:h-[10vh] bg-white p-3 md:p-5 px-5 md:px-24 shadow-md ">
          <div className="flex justify-between items-center">
            <div>
              <Link href={"/"}>
                <div>
                  <div className="font-heading hidden lg:block text-3xl">
                    Waiveer
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className=" relative w-9 h-9 md:w-12 md:h-12 flex lg:hidden">
                  <Image
                    alt="logo"
                    fill
                    className=" object-contain"
                    src={Logo}
                  />
                </div>
              </Link>
            </div>

            <div className="flex justify-evenly items-center">
              <div className="relative w-5 md:w-6 h-5 md:h-6 ml-5">
                <Image
                  alt="theme"
                  src={themeToggler}
                  className=" object-contain"
                  fill
                />
              </div>
              <div className="relative  w-5 md:w-6 h-5 md:h-6 ml-5">
                <Image
                  alt="theme"
                  src={notify}
                  className=" object-contain"
                  fill
                />
              </div>

              <div className="flex justify-evenly items-center">
                <div className="relative  w-5 md:w-10 h-5 md:h-10 ml-5">
                  <Image
                    alt="pfp"
                    src={user?.photoURL}
                    className=" object-contain rounded-full "
                    fill
                  />
                </div>
                <div className=" hidden md:block font-secondary text-xl font-medium font-ubuntu text-center ml-5">
                  {name ? name : <LoadingComponent />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default Header;
