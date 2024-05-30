import React from "react";
import Image from "next/image";
import Add from "../../public/assets/icons/add.png";
import userImage from "../../public/assets/icons/user.png";
import {useRouter} from "next/navigation";

function Cards({
  projectName,
  projectDescription,
  startDate,
  deadlineDate,
  projectSlug,
}) {
  const router = useRouter();
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
        {/* Deadline */}
        <div className="mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Deadline:
        </div>
        <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
          {deadlineDate}
        </div>
        {/* Members */}
        <div className="mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Members:
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <div>
              <div className="relative w-5 md:w-6 h-5 md:h-6 ml-5">
                <Image
                  alt="theme"
                  src={userImage}
                  className="object-contain"
                  fill
                />
              </div>
            </div>
            <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
              Aaditya Paul | Lead of Tech Dept.
            </div>
          </div>
          <div className="flex gap-1">
            <div className="relative w-5 md:w-6 h-5 md:h-6 ml-5">
              <Image
                alt="theme"
                src={userImage}
                className="object-contain"
                fill
              />
            </div>
            <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
              Bhaskar Roy | Design Dept.
            </div>
          </div>
          <div className="flex gap-1">
            <div className="relative w-5 md:w-6 h-5 md:h-6 ml-5">
              <Image
                alt="theme"
                src={userImage}
                className="object-contain"
                fill
              />
            </div>
            <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
              Rajdeep Karmakar | Tech Dept.
            </div>
          </div>
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
