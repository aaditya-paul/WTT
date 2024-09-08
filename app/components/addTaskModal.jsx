import React, {useEffect, useState} from "react";
import Close from "../../public/assets/icons/study.png";
import Image from "next/image";
function AddTaskModal({setToggleModal, toggleModal}) {
  const [projectName, setProjectName] = useState("");
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
      <div className=" z-40 w-[80%] h-[80%] bg-white rounded-lg shadow-2xl p-4 overflow-y-auto  ">
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
          <div className=" text-xl font-medium font-mono ">Task Name</div>
          <input className=" border-b border-lime-700" />
          <div className=" text-xl font-medium font-mono ">Task Id</div>
          <input className=" border-b border-lime-700" />

          <div className=" text-xl font-medium font-mono ">Task Start Date</div>
          <input className=" border-b border-lime-700" />

          <div className=" text-xl font-medium font-mono ">Task End Date</div>
          <input className=" border-b border-lime-700" />

          <div className=" text-xl font-medium font-mono ">Task Assignees</div>
          <input className=" border-b border-lime-700" />
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
