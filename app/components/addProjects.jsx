"use client";

import React from "react";
import {useSelector} from "react-redux";
import LoadingScreen from "./loadingScreen";
import Image from "next/image";
import Project from "../../public/assets/icons/study.png";
function AddProjects() {
  const user = useSelector((state) => state.authState.user);

  if (user) {
    return (
      <div className=" p-5 overflow-y-scroll h-[88vh]">
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
                    autoComplete="off"
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
                    autoComplete="off"
                    type="text"
                    placeholder="https://example.com"
                    className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
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
                    autoComplete="off"
                    type="text"
                    placeholder="https://example.com"
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
                    autoComplete="off"
                    type="email"
                    placeholder="member@email.com"
                    className="   bg-transparent border-b border-primary w-full py-2 px-1 text-4xl outline-none"
                  />
                  {/* member add */}
                  <div className=" active:scale-95 cursor-pointer p-2 border-2 border-primary rounded-md flex justify-center items-center">
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
          <div className=" active:scale-90 mb-24 py-5 text-3xl px-12 transition-all cursor-pointer flex justify-center self-center ease-linear hover:text-white hover:bg-primary border-2 border-primary w-[350px] ">
            <div>Create Project</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AddProjects;
