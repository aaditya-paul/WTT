"use client";
import NavBar from "@/app/components/navBar";
import React from "react";
import {usePathname} from "next/navigation";

function Layout({children}) {
  const pathName = usePathname();

  return (
    <div>
      <NavBar pathURL={pathName.toString()}>{children}</NavBar>
    </div>
  );
}

export default Layout;
