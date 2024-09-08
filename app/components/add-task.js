"use client";
import Image from "next/image";
import React, {useState} from "react";
import vector from "../../public/assets/tasksbg.jpg";
import AddTaskModal from "./addTaskModal";

function Addtask() {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <>
      <div className=" relative w-[20vw] h-[40vh]">
        <Image fill alt="vector" src={vector} objectFit="contain" />
      </div>
      <div className=" flex flex-col bg-white rounded-lg p-4 items-center">
        <div
          onClick={() => setToggleModal(!toggleModal)}
          className=" font-doasis text-2xl text-gray-700 py-2 px-4 mb-4 border border-lime-700 rounded-md hover:bg-lime-700 hover:text-white transition-all ease-linear cursor-pointer "
        >
          Add Tasks
        </div>
        <div className=" font-ubuntu text-sm text-gray-500">
          Add tasks to your project and assign them to your team members.
        </div>
        <div className={`${toggleModal ? "absolute" : "hidden"} top-0 left-0 `}>
          <AddTaskModal
            setToggleModal={setToggleModal}
            toggleModal={toggleModal}
          />
        </div>
      </div>
    </>
  );
}

export default Addtask;
