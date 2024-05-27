import React from "react";
import LoadingComponent from "../loadingComponent";
import {addUserDetails, userStore} from "../utils/authState";

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
