"use client";

import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "@/firebase";
import {useRouter} from "next/navigation";
import Home from "./components/home";
import LoadingScreen from "./components/loadingScreen";
import NavBar from "./components/navBar";
import {
  CheckIfDocumentExists,
  setDocument,
} from "./components/utils/firebase/firebaseQueries";
import {useDispatch} from "react-redux";
import {setUID, setUserRedux} from "@/lib/redux/features/auth";
import {doc, getDoc, getFirestore} from "firebase/firestore";
const db = getFirestore(app);
function Page() {
  const dispatch = useDispatch();

  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(false);

  // check signed in or not

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        router.replace("/");
        //  sets user to state in this page
        setUser(user);
        // sets user in redux
        dispatch(setUserRedux(JSON.parse(JSON.stringify(user))));

        dispatch(setUID(user.uid));

        // sets user in database after checking shit
        CheckIfDocumentExists("users", user.uid, user).then((exists) => {
          if (exists) {
            null;
          } else {
            console.log("setting database");
            setDocument("users", user.uid, JSON.parse(JSON.stringify(user)));
          }
        });
      } else {
        router.replace("/login");
        setUser(false);
      }
    });
  }, [auth, router, dispatch]);

  // TODO fix this shit

  if (!user) {
    return <LoadingScreen />;
  } else {
    // set the document to database everytime someone logs in !!

    // console.log("hii");
    return (
      <div className=" overflow-y-hidden">
        <NavBar pathURL={"/"}>
          <Home />
        </NavBar>
      </div>
    );
  }
}

export default Page;
