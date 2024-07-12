"use client";

import React, {use, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import LoadingScreen from "./loadingScreen";
import Image from "next/image";
import Project from "../../public/assets/icons/study.png";
import InfoImage from "../../public/assets/icons/info.svg";
import InfoModal from "./utils/infoModal";
import {setDocument} from "./utils/firebase/firebaseQueries";
import {useRouter} from "next/navigation";
import AuthStateCheck from "./utils/AuthStateCheck";
import {serverTimestamp} from "firebase/firestore";
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
  const [URLid, setURLid] = useState("");
  const router = useRouter();

  // ! for developement to be removed in production

  // useEffect(() => {
  //   return () => {
  //     localStorage.clear();
  //   };
  // });

  // retrieve data from local storage
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

  const generateUniqueId = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  };

  const handleURLEncode = (emailParam) => {
    const URLid = generateUniqueId();
    setDocument("url", URLid, {
      id: URLid,
      expire: false,
      createdAt: new Date(),
      emailAssigned: emailParam,
      _created: serverTimestamp(),
    });
    setURLid(URLid);
    // const currentTime = new Date(); // current time example: 2022-09-01T12:00:00.000Z
    // const futureTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // future time example: 2022-09-02T12:00:00.000Z
    const url = `invite?`;
    const query = `slug=${projectSlug}&urlId=${URLid}&email=${emailParam}`;
    // const encoded = encodeURIComponent(slug);
    const finalURL = process.env.NEXT_PUBLIC_URL + url + query;
    return finalURL;
  };

  const handleEmail = async (email, subject, message) => {
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: subject,
          text: message,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.log(`Failed to send email: ${data.message}`);
      }
    } catch (error) {
      console.log(`Failed to send email: ${error.message}`);
    }
  };

  const handleClick = async () => {
    const data = {
      projectName,
      projectSlug,
      projectIcon,
      projectDescription,
      startDate,
      deadlineDate,
      members: [user.uid],
      memberInvite: [...member],
      createdBy: user.uid,
    };

    if (checkValidity()) {
      // create project in database
      setDocument("projects", projectSlug, data).then(() => {
        router.push("/all-projects/" + projectSlug);
      });

      // send email

      for (const memberEmail of member) {
        await handleEmail(
          memberEmail,
          "Project Invitation",
          `You have been invited to the project: ${projectName}. Join here: ${handleURLEncode(
            memberEmail
          )}`
        );
      }

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
      member.length == 0
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
    const newMembers = member.filter((member) => member !== e);
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
                        {/* right grp  */}
                        <div className=" flex items-center gap-5">
                          {/* dlt btn */}
                          <div
                            onClick={() => removeMember(member)}
                            className=" border border-red-500 ease-linear transition-all active:scale-95  hover:bg-red-500 p-2 hover:text-white text-sm rounded-lg cursor-pointer "
                          >
                            Delete
                          </div>

                          {/* info button */}
                          <button
                            disabled
                            title="This member gets full access as a contributor"
                          >
                            <div>
                              <Image alt="info" src={InfoImage} width={28} />
                            </div>
                          </button>
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
