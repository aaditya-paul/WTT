import React from "react";

const routes = [
  {
    name: "Add Tasks",
    id: "add-tasks",
  },
  {
    name: "Gantt View",
    id: "gantt",
  },
  {
    name: "To-Do",
    id: "to-do",
  },
  {
    name: "Board View",
    id: "board",
  },
];

function ViewOptions({dashView, setDashView}) {
  return (
    <div className=" items-center flex w-full lg:gap-8 md:gap-2 mt-5 py-4 ">
      {routes.map((route) => (
        <div
          key={route.id}
          onClick={() => setDashView(route.id)}
          className={`${
            dashView == route.id
              ? "bg-lime-700 text-white"
              : "bg-white text-lime-700"
          } cursor-pointer px-4 py-2 rounded-md`}
        >
          {route.name}
        </div>
      ))}
    </div>
  );
}

export default ViewOptions;
