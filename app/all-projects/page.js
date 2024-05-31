import React from "react";
import NavBar from "../components/navBar";
import AllProjects from "../components/allProjects";

function Page() {
  return (
    <div>
      <NavBar pathURL={"/all-projects"}>
        <AllProjects />
      </NavBar>
    </div>
  );
}

export default Page;
