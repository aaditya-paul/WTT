import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "@/firebase";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setUID, setUserRedux} from "@/lib/redux/features/auth";
import {checkIfDocumentExists, setDocument} from "./firebase/firebaseQueries";
import {doc, getDoc, getFirestore} from "firebase/firestore";
const db = getFirestore(app);
function AuthStateCheck({redirectRoute}) {
  const dispatch = useDispatch();

  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        if (redirectRoute) {
          router.replace(redirectRoute.toString());
        }
        //  sets user to state in this page
        setUser(user);
        // sets user in redux
        dispatch(setUserRedux(JSON.parse(JSON.stringify(user))));
        dispatch(setUID(user.uid));

        if (checkIfDocumentExists("users", user.uid)) {
          null;
        } else {
          console.log("setting database");
          setDocument("users", user.uid, JSON.parse(JSON.stringify(user)));
        }
      } else {
        router.replace("/login");
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router, dispatch, redirectRoute]);

  return null;
}

export default AuthStateCheck;
