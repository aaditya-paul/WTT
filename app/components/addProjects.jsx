"use client";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import LoadingScreen from "./loadingScreen";
import Image from "next/image";
import Project from "../../public/assets/icons/study.png";
import InfoModal from "./utils/infoModal";
import {setDocument} from "./utils/firebase/firebaseQueries";
import {useRouter} from "next/navigation";
import AuthStateCheck from "./utils/AuthStateCheck";

function AddProjects() {
  const user = useSelector((state) => state.authState.user);
  const [projectName, setProjectName] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [projectIcon, setProjectIcon] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [member, setMember] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   return () => {
  //     localStorage.clear();
  //   };
  // });

  useEffect(() => {
    setProjectName(localStorage.getItem("projectName") || "");
    setProjectSlug(localStorage.getItem("projectSlug") || "");
    setProjectIcon(localStorage.getItem("projectIcon") || "");
    setProjectDescription(localStorage.getItem("projectDescription") || "");
    setStartDate(localStorage.getItem("startDate") || "");
    setDeadlineDate(localStorage.getItem("deadlineDate") || "");
    setMemberEmail(localStorage.getItem("memberEmail") || "");
    setMember(JSON.parse(localStorage.getItem("members")) || []);
  }, []);

  const handleClick = () => {
    const data = {
      projectName,
      projectSlug,
      projectIcon,
      projectDescription,
      startDate,
      deadlineDate,
      members: [...member, user.uid],
      createdBy: user.uid,
    };

    if (checkValidity()) {
      setDocument("projects", projectSlug, data).then(() => {
        router.push("/all-projects/" + projectSlug);
      });
      localStorage.clear();
    }
  };

  const checkValidity = () => {
    if (
      !projectName ||
      !projectSlug ||
      !projectIcon ||
      !projectDescription ||
      !startDate ||
      !deadlineDate ||
      !memberEmail
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const addMember = () => {
    if (memberEmail && validateEmail(memberEmail)) {
      // setMember([...member, memberEmail]);
      member.push(memberEmail);
      setMemberEmail("");
      localStorage.setItem("memberEmail", "");
      localStorage.setItem("members", JSON.stringify(member));
      console.log(member);
    } else {
      alert("Please enter a valid email address!");
    }
  };

  const removeMember = (e) => {
    console.log(e);
    const email = e.target.parentElement.firstChild.innerText;

    const newMembers = member.filter((member) => member !== email);
    setMember(newMembers);
    localStorage.setItem("members", JSON.stringify(newMembers));
  };

  if (user) {
    return (
      <>
        <AuthStateCheck />
        <div className="p-5 overflow-y-scroll h-[88vh]">
          <title>WTT - Create Project</title>
          <div className="font-ubuntu text-lime-700 font-medium text-3xl">
            Add Projects
          </div>
          <div className="my-5 md:mx-[5%] lg:mx-[10%] flex flex-col gap-24">
            <div>
              <div className="font-doasis text-3xl font-normal text-slate-700">
                General
              </div>
              <div className="mx-12 my-5 flex flex-col gap-12">
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Project Name:
                  </div>
                  <div className="my-5">
                    <input
                      value={projectName}
                      onChange={(e) => {
                        localStorage.setItem("projectName", e.target.value);
                        setProjectName(e.target.value);
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="Project Name 123"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Project Slug:
                  </div>
                  <div className="my-5">
                    <input
                      value={projectSlug}
                      onChange={(e) => {
                        localStorage.setItem("projectSlug", e.target.value);
                        setProjectSlug(e.target.value);
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="project-name-123"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Project Icon:
                  </div>
                  <div className="my-5">
                    <input
                      value={projectIcon}
                      onChange={(e) => {
                        localStorage.setItem("projectIcon", e.target.value);
                        setProjectIcon(e.target.value);
                      }}
                      autoComplete="off"
                      type="text"
                      placeholder="https://example.com"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Project Description:
                  </div>
                  <div className="my-5">
                    <textarea
                      value={projectDescription}
                      onChange={(e) => {
                        localStorage.setItem(
                          "projectDescription",
                          e.target.value
                        );
                        setProjectDescription(e.target.value);
                      }}
                      autoComplete="off"
                      placeholder="This project is about ..."
                      className="min-h-[120px] bg-transparent border-b border-r rounded-sm border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-doasis text-3xl font-normal text-slate-700">
                Specifics
              </div>
              <div className="mx-12 my-5 flex flex-col gap-12">
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Start Date:
                  </div>
                  <div className="my-5">
                    <input
                      value={startDate}
                      onChange={(e) => {
                        localStorage.setItem("startDate", e.target.value);
                        setStartDate(e.target.value);
                      }}
                      autoComplete="off"
                      type="date"
                      placeholder="12th March, 2024"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Deadline Date:
                  </div>
                  <div className="my-5">
                    <input
                      value={deadlineDate}
                      onChange={(e) => {
                        localStorage.setItem("deadlineDate", e.target.value);
                        setDeadlineDate(e.target.value);
                      }}
                      autoComplete="off"
                      type="date"
                      placeholder="7th August, 2024"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-medium text-slate-900">
                    Members:
                  </div>
                  <div className="my-5 flex gap-5">
                    <input
                      value={memberEmail}
                      onChange={(e) => {
                        setMemberEmail(e.target.value);
                        localStorage.setItem("memberEmail", e.target.value);
                      }}
                      autoComplete="off"
                      type="email"
                      placeholder="member@email.com"
                      className="bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                    />
                    <div
                      onClick={addMember}
                      className="transition-all ease-linear active:scale-90 cursor-pointer p-2 border-2 border-primary rounded-md flex justify-center items-center"
                    >
                      <div className="relative w-8 h-8">
                        <Image
                          alt="add"
                          src={Project}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-10 text-2xl text-slate-700 font-ubuntu">
                    {member.map((member, index) => (
                      <div
                        key={index}
                        className=" flex justify-between border border-l-primary border-b-primary border-transparent p-3 rounded-sm"
                      >
                        <div>{member}</div>
                        <div
                          onClick={removeMember}
                          className=" border border-red-500 ease-linear transition-all active:scale-95  hover:bg-red-500 p-2 hover:text-white text-sm rounded-lg cursor-pointer "
                        >
                          Delete
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={handleClick}
              className="active:scale-90 mb-24 py-5 text-3xl px-12 transition-all cursor-pointer flex justify-center self-center ease-linear hover:text-white hover:bg-primary border-2 border-primary w-[350px]"
            >
              <div>Create Project</div>
            </div>
          </div>
          <div className={`${error ? "block" : "hidden"}`}>
            <InfoModal
              errorDetails={"Please fill all the fields before submitting!"}
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
