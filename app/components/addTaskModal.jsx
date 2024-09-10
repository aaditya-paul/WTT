"use client";
import React, {useEffect, useState} from "react";
import Close from "../../public/assets/icons/study.png";
import Image from "next/image";
import ViewMembers from "./viewMembers";
import {usePathname} from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {db} from "@/firebase";
import LoadingComponent from "./loadingComponent";
function AddTaskModal({setToggleModal, toggleModal}) {
  const pathName = usePathname();
  const project_slug = pathName.slice(14);

  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [projectMember, setProjectMember] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [taskAssignees, setTaskAssignees] = useState([]);
  const [taskID, setTaskID] = useState("");

  const handleSubmit = () => {
    if (
      taskName === "" ||
      taskStartDate === "" ||
      taskEndDate === "" ||
      taskAssignees.length === 0 ||
      taskID === ""
    ) {
      alert("Fill All Details");
    }
  };

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
          //   console.log(data.members);
        });
      } catch (error) {
        console.error("Error getting project data:", error);
      }
    };

    getProjectData();
  }, [project_slug]);

  useEffect(() => {
    const getMembers = async () => {
      var Member = [];
      for (let i = 0; i < project?.members.length; i++) {
        const docRef = await getDoc(doc(db, "users", project.members[i]));
        if (docRef.exists()) {
          //   console.log(docRef.data());
          try {
            Member.push({
              name: docRef.data().displayName,
              pfp: docRef.data().photoURL,
              uid: docRef.data().uid,
            });
          } catch (e) {
            console.log(e);
          } finally {
            setLoading(false);
          }
        } else {
          console.log("No such document!");
        }
      }
      setMemberDetails(Member);
    };
    getMembers();
    setProjectMember(project?.members);
  }, [project]);

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
    <div className=" z-50 flex h-[100vh] w-[100vw] justify-center items-center overflow-hidden ">
      <div className=" z-50 w-fit h-[80%] bg-white rounded-lg shadow-2xl p-4 overflow-y-auto no-scrollbar  ">
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
              <input
                type="date"
                className=" p-2 px-0 outline-none border-b border-lime-700"
              />

              <div className=" text-xl font-medium font-mono ">
                Task End Date
              </div>
              <input
                type="date"
                className=" p-2 px-0 outline-none border-b border-lime-700"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <div className=" text-xl font-medium font-mono  ">
              Task Assignees
            </div>
            {/* <input className=" p-2 px-0 outline-none border-b border-lime-700" /> */}
            <div>
              {!toggleModal ? null : (
                <>
                  <div className=" flex flex-col no-scrollbar justify-start  h-32  overflow-y-scroll">
                    {memberDetails.map((e, index) => {
                      return (
                        <>
                          <div className=" flex items-center justify-between">
                            <div className=" flex gap-3 items-center my-1">
                              <div className=" relative w-8 h-8 ">
                                <Image
                                  className=" rounded-full"
                                  fill
                                  src={e.pfp}
                                />
                              </div>
                              <div key={index}>{e.name}</div>
                            </div>
                            <input
                              name="memcheck"
                              className=" w-5 h-5 accent-lime-600 "
                              type="checkbox"
                              onChange={(e) => {
                                console.log(e.target.checked);
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <div
                    onClick={handleSubmit}
                    className=" my-1 flex justify-center items-center p-4 border border-lime-700 hover:bg-lime-700 hover:text-white text-xl cursor-pointer transition-all ease-linear"
                  >
                    <div>Add Task</div>
                  </div>
                </>
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
