import React from "react";
import GanttChart from "./ganttView";
import Image from "next/image";
import Addtask from "./add-task";
function ViewBoard({dashView, tasks}) {
  return (
    <>
      <div
        className={`${
          dashView == "add-tasks" ? "block" : "hidden"
        } h-full w-full `}
      >
        <div className=" flex flex-col justify-center px-4 items-center  ">
          <Addtask />
        </div>
      </div>
      {/* to-do view board */}
      <div
        className={`${dashView == "to-do" ? "block" : "hidden"} h-full w-full `}
      ></div>
      {/* gantt view board */}
      <div
        className={`${dashView == "gantt" ? "block" : "hidden"} h-full w-full `}
      >
        <div className=" h-full w-full">
          <GanttChart tasks={tasks} />
        </div>
      </div>
    </>
  );
}

export default ViewBoard;
