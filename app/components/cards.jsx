import React from "react";
import Image from "next/image";
import Add from "../../public/assets/icons/add.png";
import userImage from "../../public/assets/icons/user.png";

function Cards() {
  return (
    <div className=" hover:scale-105 border-2 border-primary transition-all ease-linear bg-white w-[350px] p-5 rounded-md h-[500px] shadow-sm">
      {/* project name */}
      <div className=" text-xl">Waiveer - Student Interface</div>
      <div className=" mx-2 text-sm font-thin">Led by :- Aaditya Paul</div>
      {/* project details */}
      <div className=" mx-3">
        {/* Description */}
        <div className=" mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Description :
        </div>
        <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
          enim sit amet venenatis urna cursus eget nunc scelerisque viverra
          mauris in aliquam sem fringilla ut morbi tincidunt augue interdum
          velit euismod in.
        </div>
        {/* Deadline */}
        <div className=" mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Deadline :
        </div>
        <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
          1st Aug, 2024 ~ 7th Aug, 2024
        </div>
        {/* Members */}
        <div className=" mt-3 mb-2 font-ubuntu text-lime-600 font-medium text-lg">
          Members :
        </div>
        <div className=" flex flex-col gap-2">
          <div className=" flex gap-1">
            <div>
              <div>
                <div className="relative  w-5 md:w-6 h-5 md:h-6 ml-5">
                  <Image
                    alt="theme"
                    src={userImage}
                    className=" object-contain"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
              Aaditya Paul | Lead of Tech Dept.
            </div>
          </div>
          <div className=" flex gap-1">
            <div>
              <div>
                <div className="relative  w-5 md:w-6 h-5 md:h-6 ml-5">
                  <Image
                    alt="theme"
                    src={userImage}
                    className=" object-contain"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
              Bhaskar Roy | Design Dept.
            </div>
          </div>
          <div className=" flex gap-1">
            <div>
              <div>
                <div className="relative  w-5 md:w-6 h-5 md:h-6 ml-5">
                  <Image
                    alt="theme"
                    src={userImage}
                    className=" object-contain"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className="mx-3 font-doasis text-slate-600 font-normal text-sm">
              Rajdeep Karmakar | Tech Dept.
            </div>
          </div>
        </div>
        {/* Go to project */}
        <div className=" hover:bg-primary hover:text-white cursor-pointer  transition-all ease-linear  flex justify-center my-7 border-2 border-primary p-3">
          <div>Go to Project</div>
        </div>
      </div>
    </div>
  );
}

export function AddCard(params) {
  return (
    <div className=" hover:scale-105 border-2 border-primary transition-all ease-linear bg-white w-[350px] p-5 rounded-md h-[500px] shadow-sm flex justify-center items-center">
      <div className="  flex flex-col gap-5 items-center justify-center text-center align-top ">
        <div className=" cursor-pointer relative w-24 h-24">
          <Image fill src={Add} alt="add" />
        </div>
        <div className=" text-2xl">Add Projects</div>
      </div>
    </div>
  );
}

export default Cards;
