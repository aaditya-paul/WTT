"use client";

import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase";
import LoadingScreen from "@/app/components/loadingScreen";
import {useSelector} from "react-redux";
import Head from "next/head";
import Settings from "../../public/assets/icons/settings.png";
import Image from "next/image";
import GanttChart from "./ganttView";
import ViewOptions from "./viewOptions";
import ViewBoard from "./viewBoard";
import ViewMembers from "./viewMembers";

const tasks = [
  {
    id: "Task 1",
    name: "Task 1",
    start: "2023-09-10",
    end: "2023-12-12",
    progress: 20,
    dependencies: "",
  },
  {
    id: "Task 3",
    name: "Task 3",
    start: "2023-09-13",
    end: "2023-09-15",
    progress: 60,
  },
  {
    id: "Task 4",
    name: "Task 4",
    start: "2023-09-13",
    end: "2023-09-15",
    progress: 60,
  },
  {
    id: "Task 5",
    name: "Task 5",
    start: "2023-09-13",
    end: "2023-09-15",
    progress: 60,
  },
  {
    id: "Task 6",
    name: "Task 6",
    start: "2023-09-13",
    end: "2023-09-15",
    progress: 60,
  },
  {
    id: "Task 7",
    name: "Task 7",
    start: "2023-09-13",
    end: "2023-09-15",
    progress: 60,
  },
  {
    id: "Task 8",
    name: "Task 8",
    start: "2023-09-14",
    end: "2023-09-15",
    progress: 60,
  },
];

function SingleProject() {
  const pathName = usePathname();
  const project_slug = pathName.slice(14);

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  const [dashView, setDashView] = useState("add-tasks");

  const user = useSelector((state) => state.authState.user);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const docRef = query(
          collection(db, "projects"),
          where("projectSlug", "==", project_slug)
        );
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setProject(data);
          // console.log(data);
        });
      } catch (error) {
        console.error("Error getting project data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjectData();
  }, [project_slug]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (project) {
    if (project.members.includes(user.uid)) {
      return (
        <div className=" overflow-hidden">
          <title>{"WTT - " + project?.projectName}</title>
          <div className="  flex justify-evenly">
            <div className=" basis-3/4 flex flex-col p-4">
              <div className=" flex justify-between items-center ">
                <div className=" ">
                  <div className=" font-doasis text-sm text-gray-700">
                    Project Name
                  </div>
                  <div className=" font-ubuntu font-bold text-3xl ml-5">
                    {project.projectName.toUpperCase()}
                  </div>
                </div>
                <div className="cursor-pointer">
                  <div className=" relative w-10 h-9">
                    <Image fill alt="settings" src={Settings} />
                  </div>
                </div>
              </div>
              {/* view options */}
              <ViewOptions setDashView={setDashView} dashView={dashView} />
              <div className=" p-4 bg-white max-w-[59vw] h-[63vh] overflow-x-scroll overflow-y-scroll flex-wrap text-wrap flex-col">
                {/*view board */}
                <ViewBoard dashView={dashView} tasks={tasks} />
              </div>

              {/* <p>{project.projectDescription}</p> */}
            </div>
            <div className="  border rounded-xl bg-white shadow-md h-[86vh] lg:basis-1/4 md:basis-2/4">
              {/* Members */}
              <div className=" p-4">
                <div className=" font-doasis my-2 font-bold text-2xl text-center">
                  Members
                </div>
                <div className="flex flex-col gap-2 my-4">
                  <ViewMembers project={project} members={project.members} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No permission</div>;
    }
  } else {
    return <div>Project not found</div>;
  }
}

export default SingleProject;
