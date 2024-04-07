import React from "react";
import Login from "../components/login";
import Head from "next/head";

export const metadata = {
  title: "WTT - Login",
};
function page() {
  return (
    <>
      <div>
        <Login />
      </div>
    </>
  );
}

export default page;
