"use client";
import React, {useEffect, useState} from "react";
import LoadingScreen from "./loadingScreen";
import Image from "next/image";
import Cards, {AddCard} from "./cards";
import {useSelector} from "react-redux";
// import {DisplayFilteredName} from "./utils/filteredProvidedDetails";
function Home({userProp}) {
  const user = useSelector((state) => state.authState.user);
  const time = new Date().getHours();
  const name = user.displayName;
  // useEffect(() => {
  //   userStore.subscribe(() => {
  //     setEmail(userStore.getState().email);
  //     setUID(userStore.getState().uid);
  //     setName(DisplayFilteredName);
  //   });
  // }, []);

  if (user) {
    return (
      <div className=" overflow-y-scroll h-[88vh] pb-5">
        <title>WTT - Home</title>
        {/* heading */}
        <div className=" my-5 w-full flex justify-center">
          <div className=" w-fit group ">
            {/*  greeting  */}
            <div className=" font-ubuntu font-semibold text-4xl text-slate-800 ">
              {time < 12
                ? "Good Morning "
                : time > 15
                ? "Good Evening "
                : "Good Afternoon "}
              <span className="text-primary-accent font-medium">{name}</span> !
            </div>
            {/* underline border */}
            <div className=" w-0 bg-transparent p-[3px] group-hover:bg-primary-accent group-hover:w-full transition-all ease-linear  justify-center   my-1"></div>
          </div>
        </div>
        {/* overview */}
        <div className="m-5 my-10">
          <div className=" font-inter font-medium text-2xl ">
            Overview of recently opened projects :-{" "}
          </div>
          <div className=" flex gap-5 mx-10 my-5 font-doasis font-medium text-lime-700 ">
            {/* cards */}
            <Cards />
            {/* add project card */}
            <AddCard />
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default Home;
