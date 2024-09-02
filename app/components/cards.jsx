"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Add from "../../public/assets/icons/add.png";
import userImage from "../../public/assets/icons/user.png";
import {useRouter} from "next/navigation";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase";
import LoadingComponent from "./loadingComponent";
function Cards({
  projectName,
  projectDescription,
  startDate,
  deadlineDate,
  projectSlug,
  members,
}) {
  const router = useRouter();

  const [projectMember, setProjectMember] = useState("");

  useEffect(() => {
    const getMembers = async () => {
      var Member = [];
      for (let i = 0; i < members.length; i++) {
        const docRef = await getDoc(doc(db, "users", members[i]));
        if (docRef.exists()) {
          // console.log(docRef.data());

          Member.push({
            name: docRef.data().displayName,
            pfp: docRef.data().photoURL,
          });
        } else {
          console.log("No such document!");
        }
      }
      setProjectMember(Member);
    };
    getMembers();
    // console.log(members);
  }, [members]);
  if (projectMember.length === 0)
    return (
      <div className=" flex justify-center items-center gap-5 mx-5">
        <LoadingComponent />
      </div>
    );
  return (
    <div className="hover:scale-105 border-2 border-primary flex flex-col transition-all ease-linear bg-white w-[350px] p-5 rounded-md shadow-sm">
      {/* project name */}
      <div className="text-xl">{projectName.toUpperCase()}</div>
      <div className="mx-2 text-sm font-thin">Created by: Aaditya Paul</div>
      {/* project details */}
      <div className="flex-grow mx-3">
        {/* Description */}
        <div className="mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Description:
        </div>
        <div className="break-words mx-3 font-doasis text-slate-600 font-normal text-sm">
          {projectDescription}
        </div>
        {/* Duation */}
        <div className="mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Duration:
        </div>
        <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
          from: ({startDate}) ~ to:({deadlineDate})
        </div>
        {/* Members */}
        <div className="mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Members:
        </div>
        <div className="flex flex-col gap-2">
          {projectMember.map((e) => {
            return (
              <div key={e.index} className="flex gap-1 items-center">
                <div>
                  <div className="relative w-6  md:w-7 h-6 md:h-7 ml-5">
                    <Image
                      alt="theme"
                      // src={userImage}
                      src={e.pfp ? e.pfp : userImage}
                      className="object-contain rounded-full"
                      fill
                    />
                  </div>
                </div>
                <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
                  {e.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Go to project */}
      <div
        onClick={() => {
          router.push("/all-projects/" + projectSlug);
        }}
        className="flex hover:bg-primary hover:text-white cursor-pointer transition-all ease-linear justify-center my-7 border-2 border-primary p-3 "
      >
        <div>Go to Project</div>
      </div>
    </div>
  );
}

export function AddCard(params) {
  const router = useRouter();

  return (
    <div className="hover:scale-105 border-2 border-primary transition-all ease-linear bg-white w-[350px] p-5 rounded-md min-h-[350px] shadow-sm flex justify-center items-center">
      <div className="flex flex-col gap-5 items-center justify-center text-center align-top">
        <div
          onClick={() => {
            router.push("/add-project");
          }}
          className="cursor-pointer relative w-24 h-24"
        >
          <Image fill src={Add} alt="add" />
        </div>
        <div className="text-2xl">Add Projects</div>
      </div>
    </div>
  );
}

export default Cards;
