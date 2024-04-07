"use client";
import React, {useEffect} from "react";
import {UserAuth} from "./context/AuthContext";
import LoadingScreen from "./loadingScreen";

function setUserFromPropsToContext(userProp) {
  const {user, setUser} = UserAuth();
  setUser(userProp);
}

function Home({userProp}) {
  setUserFromPropsToContext(userProp);
  const {user, setUser} = UserAuth();
  if (user) {
    return (
      <>
        <title>WTT - Home</title>
        <div>{user?.email}</div>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default Home;
