"use client";

import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
function InfoModal({error = true, type = "warning", errorDetails, setError}) {
  // const [toggle, setToggle] = useState(true);
  return (
    <div
      className={`fixed font-doasis top-0 right-0 w-4/5 md:w-2/5 z-50 ${
        type == "warning"
          ? "bg-[#e3be02]"
          : type == "error"
          ? "bg-[#e32002]"
          : "bg-[#e3be02]"
      } rounded-xl p-5 m-5 font-bold text-white`}
    >
      <div className="flex justify-between">
        <div>{errorDetails}</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setError(!error);
          }}
        >
          <FontAwesomeIcon icon={faX} width={24} height={24} />
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
