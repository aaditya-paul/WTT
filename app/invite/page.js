// TODO MANAGE USER INVITATION IF NOT ALREADY SIGNED IN
// TODO EXPIRE LINK IF EXCEEDED 24 HOURS OF BEING CREATED
// TODO MAKE IT ACCEPT INVITATION
// TODO WORK ON UI
"use client";

import React, {useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import {useSelector} from "react-redux";
import AuthStateCheck from "../components/utils/AuthStateCheck";
import LoadingComponent from "../components/loadingComponent";
import LoadingScreen from "../components/loadingScreen";
import NavBar from "../components/navBar";
import {getDocument} from "../components/utils/firebase/firebaseQueries";

function Page() {
  const searchParams = useSearchParams();
  const pathURL = usePathname();
  const slug = searchParams.get("slug");
  const id = searchParams.get("urlId");
  const user = useSelector((state) => state.authState.user);
  const [authUser, setAuthUser] = useState(null);
  const [expire, setExpire] = useState();
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  useEffect(() => {
    getDocument("url", id).then((data) => {
      setExpire(data.expire);
    });
  }, [id]);

  useEffect(() => {
    getDocument("projects", slug).then((data) => {
      // console.log(data);
      setProjectName(data.projectName);
      setProjectDetails(data.projectDescription);
    });
  }, [slug]);

  // console.log(expire);

  if (expire !== undefined) {
    if (!expire || projectName) {
      return (
        <>
          <title>WTT - Invite</title>
          <AuthStateCheck />
          {user.displayName ? (
            <div className=" flex justify-center items-center h-[100vh] w-full">
              <div>
                Hey <span>{user.displayName}</span> ! you have been invited to
                collaborate on the project{" "}
                <span>&quot;{projectName}&quot;</span>
                <br />
                <span>Project Description : {projectDetails}</span>
                <div className=" mt-5 cursor-pointer active:scale-95 transition-all ease-linear p-2 border w-48 flex items-center justify-center">
                  <div>Accept Invite</div>
                </div>
              </div>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </>
      );
    } else {
      return (
        <div className=" flex justify-center items-center h-[100vh] w-full">
          <div>Sorry the link has expired</div>
        </div>
      );
    }
  } else {
    return <LoadingScreen />;
  }
}

export default Page;
