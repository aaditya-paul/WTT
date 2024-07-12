import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "@/firebase";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setUID, setUserRedux} from "@/lib/redux/features/auth";
import {CheckIfDocumentExists, setDocument} from "./firebase/firebaseQueries";
import {doc, getDoc, getFirestore} from "firebase/firestore";
const db = getFirestore(app);

function AuthStateCheck({redirectRoute}) {
  // if (redirectRoute === undefined) {
  //   throw Error("Enter redirect url");
  // }

  // console.log(redirectRoute);

  const dispatch = useDispatch();

  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        //  sets user to state in this page
        setUser(user);
        // sets user in redux
        dispatch(setUserRedux(JSON.parse(JSON.stringify(user))));
        dispatch(setUID(user.uid));

        CheckIfDocumentExists("users", user.uid, user).then((exists) => {
          if (exists) {
            null;
          } else {
            console.log("setting database");
            setDocument("users", user.uid, JSON.parse(JSON.stringify(user)));
          }
        });

        // window.location.reload();
        // console.log("heyy" + redirectRoute);

        // router.replace(redirectRoute ? redirectRoute : "/");
      } else {
        router.replace(
          `/login${redirectRoute ? `?redirect=${redirectRoute}` : ""}`
        );
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, redirectRoute, router]);

  return null;
}

export default AuthStateCheck;
