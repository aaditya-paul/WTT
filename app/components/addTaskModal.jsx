import React from "react";
import Close from "../../public/assets/icons/study.png";
import Image from "next/image";
function AddTaskModal({setToggleModal, toggleModal}) {
  return (
    <div className=" flex h-[100vh] w-[100vw] justify-center items-center ">
      <div className=" z-40 w-[80%] h-[80%] bg-white rounded-lg shadow-2xl p-4 flex justify-between align-middle   ">
        <div className=" font-doasis font-semibold text-3xl">Add Task</div>
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
      <div className=" absolute h-[100vh] w-[100vw] bg-white bg-opacity-30 backdrop-blur-[2px]"></div>
    </div>
  );
}

export default AddTaskModal;
