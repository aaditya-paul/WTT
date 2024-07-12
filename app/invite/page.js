"use client";

import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
function Page() {
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const slug = searchParams.get("slug");
  const id = searchParams.get("urlId");
  return (
    <>
      <title>WTT - Accept Invite</title>
      <div>{slug}</div>
    </>
  );
}

export default Page;
