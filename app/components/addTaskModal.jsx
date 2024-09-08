"use client";
import React, {useEffect, useState} from "react";
import Close from "../../public/assets/icons/study.png";
import Image from "next/image";
import ViewMembers from "./viewMembers";
import {usePathname} from "next/navigation";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase";
import LoadingComponent from "./loadingComponent";
function AddTaskModal({setToggleModal, toggleModal}) {
  const pathName = usePathname();
  const project_slug = pathName.slice(14);

  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);

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
          console.log(data);
        });
      } catch (error) {
        console.error("Error getting project data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjectData();
  }, []);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setToggleModal(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [setToggleModal, toggleModal]);
  return (
    <div className=" flex h-[100vh] w-[100vw] justify-center items-center overflow-hidden ">
      <div className=" z-40 w-fit h-[80%] bg-white rounded-lg shadow-2xl p-4 overflow-y-auto  ">
        <div className=" flex justify-between align-middle">
          {/* heading */}
          <div className=" font-doasis font-semibold text-3xl">Add Task</div>
          {/* close btn */}
          <div className=" cursor-pointer">
            <div className=" relative h-9 w-9 rotate-45">
              <Image
                fill
                alt="close"
                src={Close}
                onClick={() => setToggleModal(!toggleModal)}
              />
            </div>
          </div>
        </div>
        <div className=" m-4 gap-4 flex flex-col ">
          <div className=" flex gap-20 my-5 justify-evenly items-center">
            <div className=" grid gap-4 ">
              <div className=" text-xl font-medium font-mono ">Task Name</div>
              <input className="  p-2 px-0 outline-none border-b border-lime-700" />
              <div className=" text-xl font-medium font-mono ">Task Id</div>
              <input className=" p-2 px-0 outline-none border-b border-lime-700 " />
            </div>
            <div className=" grid gap-4 p-2 ">
              <div className=" text-xl font-medium font-mono ">
                Task Start Date
              </div>
              <input className=" p-2 px-0 outline-none border-b border-lime-700" />

              <div className=" text-xl font-medium font-mono ">
                Task End Date
              </div>
              <input className=" p-2 px-0 outline-none border-b border-lime-700" />
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <div className=" text-xl font-medium font-mono  ">
              Task Assignees
            </div>
            {/* <input className=" p-2 px-0 outline-none border-b border-lime-700" /> */}
            <div>
              {loading ? (
                <LoadingComponent />
              ) : (
                <div className=" flex justify-between  items-center">
                  <ViewMembers project={project} members={project?.members} />
                  hi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          setToggleModal(!toggleModal);
        }}
        className=" absolute h-[100vh] w-[100vw] bg-white bg-opacity-30 backdrop-blur-[2px]"
      ></div>
    </div>
  );
}

export default AddTaskModal;
