"use client";

import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "@/firebase";
import {useRouter} from "next/navigation";
import Home from "./components/home";
import LoadingScreen from "./components/loadingScreen";
import NavBar from "./components/navBar";
import {addUser, addUserDetails, userStore} from "./components/utils/authState";
import {useSelector, useStore} from "react-redux";
import {getDocument} from "./components/utils/firebase/firebaseQueries";

function Page() {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(false);
  const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // router.push("/");
        router.replace("/");
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        router.replace("/login");
        setUser(false);
      }
    });
  };

  useEffect(() => {
    checkAuthState();
  });

  if (!user) {
    return <LoadingScreen />;
  } else {
    userStore.dispatch(addUser(user));
    userStore.dispatch(addUserDetails(user));
    // get document and user data from firebase database
    getDocument(userStore.getState().uid).then((e) =>
      userStore.dispatch(addUserDetails(e))
    );
    return (
      <div className=" overflow-y-hidden">
        <NavBar pathURL={"/"}>
          <Home userProp={user} />
        </NavBar>
      </div>
    );
  }
}

export default Page;
