import React from "react";
import NavBar from "../components/navBar";
import AddProjects from "../components/addProjects";

function Page() {
  return (
    <div>
      <NavBar pathURL={"/add-project"}>
        <AddProjects />
      </NavBar>
    </div>
  );
}

export default Page;
