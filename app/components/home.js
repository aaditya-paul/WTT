"use client";
import React, {useEffect, useState} from "react";
import LoadingScreen from "./loadingScreen";
import Cards, {AddCard} from "./cards";
import {useSelector} from "react-redux";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {app} from "@/firebase";

// import {DisplayFilteredName} from "./utils/filteredProvidedDetails";
function Home({userProp}) {
  const user = useSelector((state) => state.authState.user);
  const time = new Date().getHours();
  const name = user.displayName;
  const [projectData, setProjectData] = useState([]);
  const db = getFirestore(app);
  const [clock, setClock] = useState(new Date());

  // const formatTime = (date) => {
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   const seconds = String(date.getSeconds()).padStart(2, "0");
  //   return `${hours}:${minutes}:${seconds}`;
  // };

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
      }
    }
    getData();
  }, [db, user]);

  // useEffect(() => {
  //   const timerId = setInterval(() => setClock(new Date()), 1000);
  //   return () => clearInterval(timerId);
  // }, []);

  // console.log(projectData);
  if (user) {
    return (
      <div className=" overflow-y-scroll overflow-x-hidden h-[88vh] pb-5">
        <title>WTT - Home</title>
        {/* heading */}
        <div className=" my-5 w-full flex justify-center ">
          <div className=" w-fit group ">
            {/*  greeting  */}
            <div className=" basis-2/3 font-ubuntu font-semibold text-4xl text-slate-800 ">
              {time < 12
                ? "Good Morning "
                : time > 15
                ? "Good Evening "
                : "Good Afternoon "}
              <span className="text-primary-accent font-medium">{name}</span> !
            </div>
            {/* underline border */}
            <div className=" w-0 bg-transparent p-[3px] group-hover:bg-primary-accent group-hover:w-full transition-all ease-linear  justify-center   my-1"></div>
          </div>
        </div>
        {/* <div className=" relative p-2  text-purple-700 -top-[85px] -right-[80%] font-ubuntu font-semibold text-4xl ">
          {formatTime(clock)}
        </div> */}
        {/* overview */}
        <div className="m-5 my-10">
          <div className=" font-inter font-medium text-2xl ">
            Recent projects you were added in :-{" "}
          </div>
          <div className="  mx-10 my-5 font-doasis font-medium text-lime-700 ">
            {/* cards */}
            <div className="flex h-full gap-5 flex-wrap ">
              {projectData.length == 0
                ? null
                : projectData.slice(-2).map((e) => {
                    return (
                      <Cards
                        key={e.projectSlug}
                        projectName={e.projectName}
                        projectDescription={e.projectDescription}
                        startDate={e.startDate}
                        deadlineDate={e.deadlineDate}
                        projectSlug={e.projectSlug}
                        members={e.members}
                      />
                    );
                  })}
              <AddCard />
            </div>
            {/* add project card */}
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default Home;
