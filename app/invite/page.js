"use client";

import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useSelector} from "react-redux";
import AuthStateCheck from "../components/utils/AuthStateCheck";
import LoadingScreen from "../components/loadingScreen";
import {getDocument} from "../components/utils/firebase/firebaseQueries";
import {arrayUnion, doc, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import "../../styles/invite.css";
import Link from "next/link";
function Page() {
  const searchParams = useSearchParams();
  const pathURL = usePathname();

  const slug = searchParams.get("slug");
  const id = searchParams.get("urlId");
  const email = searchParams.get("email");

  const user = useSelector((state) => state.authState.user);
  const [expire, setExpire] = useState();
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [createdAt, setCreatedAt] = useState();
  const router = useRouter();
  const handleAccept = async () => {
    try {
      if (!projectSlug || !user?.uid || !id) {
        console.error("Project slug or user UID is not defined.");
        return;
      }

      const urlRef = doc(db, "url", id);

      await setDoc(
        urlRef,
        {
          expire: true,
        },
        {merge: true}
      );

      const projectDocRef = doc(db, "projects", projectSlug);

      await setDoc(
        projectDocRef,
        {
          members: arrayUnion(user.uid),
        },
        {merge: true}
      ).then(() => {
        router.replace("/all-projects/" + projectSlug);
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleReject = async () => {
    const urlRef = doc(db, "url", id);

    await setDoc(
      urlRef,
      {
        expire: true,
      },
      {merge: true}
    ).then(() => {
      router.replace("/");
    });
  };

  useEffect(() => {
    getDocument("url", id).then((data) => {
      setProjectSlug(data.slug);
      setExpire(data.expire);
      setCreatedAt(data.createdAt);
      console.log("hey dear");
    });
  }, [id]);

  useEffect(() => {
    if (projectSlug) {
      getDocument("projects", projectSlug).then((data) => {
        setProjectName(data.projectName);
        setProjectDetails(data.projectDescription);
      });
    }
  }, [projectSlug]);

  useEffect(() => {
    if (createdAt) {
      const now = new Date();
      const createdAtDate = new Date(createdAt.seconds * 1000); // Assuming createdAt is a Firestore Timestamp
      const hoursDifference = (now - createdAtDate) / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        console.log("24 hrs have passed"); // Mark as expired if more than 24 hours have passed
        setExpire(true);
        setDoc(
          doc(db, "url", id),
          {
            expire: true,
          },
          {merge: true}
        );
      }
    }
  }, [createdAt, id]);

  if (expire !== undefined) {
    if (!expire && projectName) {
      return (
        <>
          <title>WTT - Invite</title>
          <AuthStateCheck redirectRoute={pathURL + "?" + searchParams} />

          {user.displayName ? (
            <div>
              <div className="  blur-sm pattern-bg flex flex-col justify-center items-center h-[100vh] w-full">
                <div className=" absolute bg-black h-full w-full bg-opacity-0  "></div>
              </div>
              <div className=" font-inter font-medium  text-xl leading-8 absolute gap-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 flex flex-col justify-center items-center p-12 w-[50%] h-[40%] rounded-2xl shadow-2xl ">
                <div>
                  Hey{" "}
                  <span className=" text-green-700 font-bold text-2xl font-mono">
                    {user.displayName + " "}!
                  </span>
                  <br />
                  <span>
                    you have been invited to collaborate on the project :{" "}
                  </span>
                  <span className=" text-green-700 font-bold font-mono">
                    &quot;{projectName}&quot;
                  </span>
                  <br />
                  <div className=" flex  gap-5">
                    <div
                      onClick={handleAccept}
                      className=" text-lg mt-5 cursor-pointer active:scale-95 transition-all ease-linear p-2 border border-green-700 rounded-md bg-green-700 text-white w-48 flex items-center justify-center"
                    >
                      <div>Accept Invite</div>
                    </div>
                    <div
                      onClick={handleReject}
                      className=" text-lg mt-5 cursor-pointer active:scale-95 transition-all ease-linear p-2 border border-red-700 rounded-md bg-red-700 text-white w-48 flex items-center justify-center"
                    >
                      <div>Reject Invite</div>
                    </div>
                  </div>
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
        <>
          <div className="  blur-sm pattern-bg flex flex-col justify-center items-center h-[100vh] w-full">
            <div className=" absolute bg-black h-full w-full bg-opacity-0  "></div>
          </div>
          <div className="font-inter font-medium  text-xl leading-8 absolute gap-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 flex flex-col justify-center items-center p-5 w-[50%] h-[40%] rounded-2xl shadow-2xl ">
            <div className="  ">
              Sorry, the link has expired, Just like your childhood.
            </div>
            <div className="  ">
              Please ask the project admin to send another invitation link.
            </div>

            <Link
              href={"/"}
              className="cursor-pointer active:scale-95 transition-all ease-linear p-2 border border-green-700 rounded-md bg-green-700 text-white w-48 flex items-center justify-center"
            >
              <div>Go Back</div>
            </Link>
          </div>
        </>
      );
    }
  } else {
    return <LoadingScreen />;
  }
}

export default Page;
