import React from "react";
import LoadingComponent from "../loadingComponent";
import {addUserDetails, userStore} from "../utils/authState";
import Image from "next/image";
import userImage from "../../../public/assets/icons/user.png";

export const DisplayFilteredName = () => {
  if (userStore.getState().displayName) {
    return (
      userStore.getState().displayName.charAt(0).toUpperCase() +
      userStore.getState().displayName.slice(1)
    );
  } else if (userStore.getState().userDetails.displayName) {
    return (
      userStore.getState().userDetails.displayName.charAt(0).toUpperCase() +
      userStore.getState().userDetails.displayName.slice(1)
    );
  } else {
    return <LoadingComponent />;
  }
};

export const DisplayFilteredPFP = () => {
  if (userStore.getState().photoURL) {
    return (
      <div>
        <div className="relative  w-5 md:w-10 h-5 md:h-10 ml-5">
          <Image
            fill
            src={userStore.getState().photoURL}
            alt="pfp"
            className=" rounded-full"
          />
        </div>
      </div>
    );
  } else if (userStore.getState().userDetails.photoURL) {
    return (
      <div>
        <div className="relative  w-5 md:w-10 h-5 md:h-10 ml-5">
          <Image
            fill
            src={userStore.getState().userDetails.photoURL}
            alt="pfp"
            className=" rounded-full"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="relative  w-5 md:w-6 h-5 md:h-6 ml-5">
          <Image alt="theme" src={userImage} className=" object-contain" fill />
        </div>
      </div>
    );
  }
};
