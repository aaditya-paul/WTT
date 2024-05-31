"use client";

import React, {useEffect, useState} from "react";
import AuthStateCheck from "./utils/AuthStateCheck";
import Cards from "./cards";
import {useSelector} from "react-redux";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {app} from "@/firebase";
import LoadingScreen from "./loadingScreen";

function AllProjects() {
  const [projectData, setProjectData] = useState([]);
  const db = getFirestore(app);
  const user = useSelector((state) => state.authState.user);
  useEffect(() => {
    async function getData() {
      if (user.uid) {
        const q = query(
          collection(db, "projects"),
          where("members", "array-contains", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const projectsArray = [];
        querySnapshot.forEach((doc) => {
          projectsArray.push({id: doc.id, ...doc.data()});
        });

        setProjectData(projectsArray);
      } else {
        null;
      }
    }
    getData();
  }, [db, user]);
  if (user) {
    return (
      <>
        <AuthStateCheck />

        <div className="m-5 my-10 overflow-y-scroll h-[80vh] ">
          <title>WTT - All Projects</title>
          <div className="w-full flex justify-center">
            <div className=" w-fit group flex flex-col justify-center items-center">
              <div className="   font-ubuntu font-semibold text-4xl text-slate-800 ">
                All the projects you contribute to :-{" "}
              </div>
              <div className=" w-0 bg-transparent p-[3px] group-hover:bg-primary-accent group-hover:w-full transition-all ease-linear  justify-center   my-1"></div>
            </div>
          </div>
          <div className="  mx-10 my-5 font-doasis font-medium text-lime-700 ">
            {/* cards */}
            <div className="flex h-full gap-5 flex-wrap ">
              {projectData.length == 0 ? (
                <div className=" flex justify-center w-full my-12">
                  <div className=" text-3xl text-slate-700">
                    You have no projects :(
                  </div>
                </div>
              ) : (
                projectData.map((e) => {
                  return (
                    <Cards
                      key={e.projectSlug}
                      projectName={e.projectName}
                      projectDescription={e.ProjectDescription}
                      startDate={e.startDate}
                      deadlineDate={e.deadlineDate}
                      projectSlug={e.projectSlug}
                    />
                  );
                })
              )}
            </div>
            {/* add project card */}
          </div>
        </div>
      </>
    );
  } else {
    <LoadingScreen />;
  }
}

export default AllProjects;
