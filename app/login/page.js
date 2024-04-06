import React from "react";
import Login from "../components/login";
import Head from "next/head";

function page() {
  return (
    <>
      <title>WTT - Login</title>
      <div>
        <Login />
      </div>
    </>
  );
}

export default page;
