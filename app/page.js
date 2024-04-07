"use client";

import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "@/firebase";
import {useRouter} from "next/navigation";
import Home from "./components/home";
import {AuthContextProvider} from "./components/context/AuthContext";
import LoadingScreen from "./components/loadingScreen";

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
    return (
      <AuthContextProvider value={user}>
        <Home userProp={user} />
      </AuthContextProvider>
    );
  }
}

export default Page;
