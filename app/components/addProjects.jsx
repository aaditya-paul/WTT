"use client";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import LoadingScreen from "./loadingScreen";
import Image from "next/image";
import Project from "../../public/assets/icons/study.png";
import InfoModal from "./utils/infoModal";
import {setDocument, updateDocument} from "./utils/firebase/firebaseQueries";
import {useRouter} from "next/navigation";
import AuthStateCheck from "./utils/AuthStateCheck";
function AddProjects() {
  const user = useSelector((state) => state.authState.user);
  const [projectName, setProjectName] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [ProjectIcon, setProjectIcon] = useState("");
  const [ProjectDescription, setProjectDescripton] = useState("");
  const [startDate, setStartDate] = useState();
  const [deadlineDate, setDeadlineDate] = useState();
  const [member, setMember] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setProjectName(localStorage.getItem("projectName"));
    setProjectSlug(localStorage.getItem("projectSlug"));
    setProjectIcon(localStorage.getItem("ProjectIcon"));
    setProjectDescripton(localStorage.getItem("ProjectDescription"));
    setStartDate(localStorage.getItem("startDate"));
    setDeadlineDate(localStorage.getItem("deadlineDate"));
    setMemberEmail(localStorage.getItem("memberEmail"));
  }, []);

  const handleClick = (
    projectName,
    projectSlug,
    ProjectIcon,
    ProjectDescription,
    startDate,
    deadlineDate,
    memberEmail
  ) => {
    const data = {
      projectName: projectName,
      projectSlug: projectSlug,
      ProjectIcon: ProjectIcon,
      ProjectDescription: ProjectDescription,
      startDate: startDate,
      deadlineDate: deadlineDate,
      members: [...member, user.uid],
      createdBy: user.uid,
    };

    if (
      checkValidity(
        projectName,
        projectSlug,
        ProjectIcon,
        ProjectDescription,
        startDate,
        deadlineDate,
        memberEmail
      )
    ) {
      //logic
      // sets doc in database
      setDocument("projects", projectSlug, data).then(() => {
        router.push("/all-projects/" + projectSlug);
      });
      // updateDocument("users", user.uid, {
      //   "projects": arrayUnion(projectSlug),
      // });
      // clears cache
      localStorage.clear();
    }
  };

  const checkValidity = (
    projectName,
    projectSlug,
    ProjectIcon,
    ProjectDescription,
    startDate,
    deadlineDate,
    memberEmail
  ) => {
    if (
      projectName == "" ||
      projectSlug == "" ||
      ProjectIcon == "" ||
      ProjectDescription == "" ||
      startDate == undefined ||
      deadlineDate == undefined ||
      memberEmail == []
    ) {
      setError(true);

      return false;
    } else {
      setError(false);
      return true;
    }
  };

  if (user) {
    return (
      <>
        <AuthStateCheck />
        <div className=" p-5 overflow-y-scroll h-[88vh]">
          <title>WTT - Create Project</title>
          {/* heading 1 */}

          <div className=" font-ubuntu text-lime-700 font-medium text-3xl ">
            Add Projects
          </div>
          <div className=" my-5 md:mx-[5%] lg:mx-[10%] flex flex-col gap-24">
            {/* heading 2 */}
            <div>
              <div className="  font-doasis  text-3xl font-normal text-slate-700">
                General
              </div>

              {/* content under heading 2 */}
              <div className=" mx-12 my-5 flex flex-col gap-12">
                {/* project name */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Project Name :
                  </div>
                  <div className=" my-5  ">
                    <input
                      value={projectName}
                      onChange={(e) => {
                        localStorage.setItem("projectName", e.target.value);
                        setProjectName(localStorage.getItem("projectName"));
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="Project Name 123"
                      className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                {/* project slug */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Project Slug :
                  </div>
                  <div className=" my-5  ">
                    <input
                      value={projectSlug}
                      autoComplete="off"
                      onChange={(e) => {
                        localStorage.setItem("projectSlug", e.target.value);
                        setProjectSlug(localStorage.getItem("projectSlug"));
                      }}
                      type="text"
                      placeholder="project-name-123"
                      className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                {/* project icon url */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Project Icon :
                  </div>
                  <div className=" my-5  ">
                    <input
                      value={ProjectIcon}
                      autoComplete="off"
                      type="text"
                      onChange={(e) => {
                        localStorage.setItem("ProjectIcon", e.target.value);
                        setProjectIcon(localStorage.getItem("ProjectIcon"));
                      }}
                      placeholder="https://example.com"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                {/* project description */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Project Description :
                  </div>
                  <div className=" my-5  ">
                    <textarea
                      value={ProjectDescription}
                      onChange={(e) => {
                        localStorage.setItem(
                          "ProjectDescription",
                          e.target.value
                        );
                        setProjectDescripton(
                          localStorage.getItem("ProjectDescription")
                        );
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="This project is about ..."
                      className=" min-h-[120px] bg-transparent border-b border-r rounded-sm border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* heading 3 */}
            <div>
              <div className="  font-doasis  text-3xl font-normal text-slate-700">
                Specifics
              </div>

              {/* content under heading 3 */}
              <div className=" mx-12 my-5 flex flex-col gap-12">
                {/* start date */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Start Date :
                  </div>
                  <div className=" my-5  ">
                    <input
                      value={startDate}
                      onChange={(e) => {
                        localStorage.setItem("startDate", e.target.value);
                        setStartDate(localStorage.getItem("startDate"));
                      }}
                      autoComplete="off"
                      type="date"
                      placeholder="12th March, 2024"
                      className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>

                {/* deadline */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Deadline Date :
                  </div>
                  <div className=" my-5  ">
                    <input
                      value={deadlineDate}
                      onChange={(e) => {
                        localStorage.setItem("deadlineDate", e.target.value);
                        setDeadlineDate(localStorage.getItem("deadlineDate"));
                      }}
                      autoComplete="off"
                      type="date"
                      placeholder="7th August, 2024"
                      className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                {/* members */}

                <div>
                  <div className=" text-4xl font-medium text-slate-900">
                    Members :
                  </div>
                  <div className=" my-5 flex gap-5 ">
                    <input
                      value={memberEmail}
                      autoComplete="off"
                      onChange={(e) => {
                        // setMemberEmail([...memberEmail,e
                        localStorage.setItem("memberEmail", e.target.value);
                        setMemberEmail(localStorage.getItem("memberEmail"));
                      }}
                      type="email"
                      placeholder="member@email.com"
                      className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                    {/* member add */}
                    <div className=" transition-all ease-linear active:scale-90 cursor-pointer p-2 border-2 border-primary rounded-md flex justify-center items-center">
                      <div className=" relative w-8 h-8  ">
                        <Image
                          alt="add"
                          src={Project}
                          fill
                          className=" object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div
              onClick={() => {
                handleClick(
                  projectName,
                  projectSlug,
                  ProjectIcon,
                  ProjectDescription,
                  startDate,
                  deadlineDate,
                  memberEmail
                );
              }}
              className=" active:scale-90 mb-24 py-5 text-3xl px-12 transition-all cursor-pointer flex justify-center self-center ease-linear hover:text-white hover:bg-primary border-2 border-primary w-[350px] "
            >
              <div>Create Project</div>
            </div>
          </div>
          <div className={`${error ? "block" : "hidden"}`}>
            <InfoModal
              errorDetails={"Please fill all the fields before submitting !"}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AddProjects;
