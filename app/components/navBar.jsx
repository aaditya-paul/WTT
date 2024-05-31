"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Hamburger from "../../public/assets/icons/hamburger.svg";
import Dashboard from "../../public/assets/icons/dashboard.png";
import Jobs from "../../public/assets/icons/jobs.png";
import Project from "../../public/assets/icons/study.png";
import Settings from "../../public/assets/icons/icons8-settings.svg";
import LogOut from "../../public/assets/icons/logout_1828427.png";
import DropDown from "../../public/assets/icons/caret.png";
import Link from "next/link";
// import {usePathname} from "next/navigation";
import Header from "./header";
import {getAuth, signOut} from "firebase/auth";
import {app} from "@/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {useSelector} from "react-redux";
import LoadingComponent from "./loadingComponent";

const routes = [
  {name: "Dashboard", path: "/", icon: Dashboard, isVisibleOnPhn: true},
  {
    name: "Projects",
    path: "/all-projects",
    icon: Jobs,
    isVisibleOnPhn: true,
    hasDropDown: true,
  },
  {
    name: "Create Project",
    path: "/add-project",
    icon: Project,
    isVisibleOnPhn: true,
    hasDropDown: false,
  },
];
function NavBar({children, pathURL}) {
  if (pathURL === undefined) {
    throw new Error("Pass the prop pathURL !!");
  }
  const user = useSelector((state) => state.authState.user);

  const [projectData, setProjectData] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(true);
  const [dropDown, setDropDown] = useState(true);
  const db = getFirestore(app);
  useEffect(() => {
    async function getData() {
      if (user.uid) {
        const q = query(
          collection(db, "projects"),
          where("members", "array-contains", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const projectsArray = [];
        querySnapshot.forEach((doc) => {
          projectsArray.push({id: doc.id, ...doc.data()});
        });

        setProjectData(projectsArray);
      }
    }
    getData();
  }, [db, user]);

  // console.log(projectData);
  return (
    <>
      <Header />
      <div className="flex  ">
        <div
          className={` hidden md:flex h-[90vh] bg-white shadow-inner transition-all duration-75 ease-linear ${
            toggleMenu ? " w-3/4 md:w-[300px]" : "w-[25%] md:w-28 "
          }  `}
        >
          <div className=" p-5  w-full  ">
            <div className="h-full">
              <div
                className={` flex ${
                  toggleMenu ? "justify-end" : "justify-center"
                }`}
              >
                <div
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                    setDropDown(!DropDown);
                  }}
                  className="relative w-8 h-8 cursor-pointer  "
                >
                  <Image
                    alt="hamburger"
                    src={Hamburger}
                    className=" object-contain"
                    fill
                  />
                </div>
              </div>
              <div className=" overflow-auto flex  flex-col justify-between w-full  cursor-pointer  h-full ">
                <div>
                  {routes.map((e) => {
                    return (
                      <Link key={e.name} href={e.path}>
                        <div
                          className={`flex p-3 items-center my-1 rounded-lg ${
                            pathURL == e.path
                              ? " bg-[#cbeb66] bg-opacity-80"
                              : "bg-transparent"
                          } ${
                            toggleMenu ? "justify-normal" : "justify-center"
                          } ${e.hasDropDown ? "hidden" : "flex"} `}
                        >
                          <div className=" relative w-6 h-6 ">
                            <Image
                              alt={e.name}
                              src={e.icon}
                              fill
                              className=" object-contain "
                            />
                          </div>
                          <p
                            className={`text-justify text-sm md:text-sm transition-all duration-500 mx-4 ${
                              toggleMenu ? "block " : " hidden "
                            } `}
                          >
                            {e.name}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="flex overflow-hidden items-center justify-between">
                    <Link href={"/all-projects"}>
                      <div
                        className={`flex p-3 items-center my-1 rounded-lg  ${
                          toggleMenu ? "justify-normal" : "justify-center"
                        } `}
                      >
                        <div className=" relative w-6 h-6 ">
                          <Image
                            alt={"projects"}
                            src={Jobs}
                            fill
                            className=" object-contain "
                          />
                        </div>
                        <p
                          className={`text-justify text-sm md:text-sm transition-all duration-500 mx-4 ${
                            toggleMenu ? "block " : " hidden "
                          }`}
                        >
                          Projects
                        </p>
                      </div>
                    </Link>
                    <div>
                      <div
                        onClick={() => {
                          setDropDown(!dropDown);
                        }}
                        className={` relative w-6 h-6 mt-0.5 transition-all ease-linear ${
                          dropDown ? "rotate-0" : "-rotate-90"
                        } `}
                      >
                        <Image
                          alt={"projects"}
                          src={DropDown}
                          fill
                          className=" object-contain "
                        />
                      </div>
                    </div>
                  </div>
                  {/* projectss */}
                  <div
                    className={` overflow-y-scroll h-[300px] ${
                      dropDown ? "flex" : "hidden"
                    } justify-center`}
                  >
                    {projectData.length > 0 ? (
                      <div
                        className={`flex flex-col items-center justify-center w-full mt-10`}
                      >
                        {projectData.map((e) => {
                          return (
                            <div className="w-full" key={e.id}>
                              <div className=" font-normal font-ubuntu text-lg gap-2 my-1 p-3 text-center border-b-2 border-b-slate-200 w-full">
                                <Link href={"/all-projects/" + e.projectSlug}>
                                  {e.projectName.toUpperCase()}
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col mb-14 md:mb-5 ">
                  <Link href={"/settings"}>
                    <div
                      className={`flex p-3 items-center mb-1 rounded-lg ${
                        pathURL == "/settings"
                          ? " bg-[#cbeb66] bg-opacity-80"
                          : "bg-transparent"
                      } ${toggleMenu ? "justify-normal" : "justify-center"} `}
                    >
                      <div className=" relative w-6 h-6 ">
                        <Image
                          alt={"settings"}
                          src={Settings}
                          fill
                          className=" object-contain "
                        />
                      </div>
                      <p
                        className={`text-justify text-sm md:text-sm transition-all duration-500 mx-4 ${
                          toggleMenu ? "block " : " hidden "
                        }`}
                      >
                        Settings
                      </p>
                    </div>
                  </Link>
                  <div
                    onClick={() => {
                      signOut(getAuth(app));
                    }}
                    className={`flex p-3 items-center rounded-lg ${
                      pathURL == "/logout"
                        ? " bg-[#cbeb66] bg-opacity-80"
                        : "bg-transparent"
                    } ${toggleMenu ? "justify-normal" : "justify-center"} `}
                  >
                    <div className=" relative w-6 h-6 ">
                      <Image
                        alt={"logout"}
                        src={LogOut}
                        fill
                        className=" object-contain "
                      />
                    </div>
                    <p
                      className={`text-justify text-sm md:text-sm transition-all duration-500 mx-4 ${
                        toggleMenu ? "block " : " hidden "
                      }`}
                    >
                      LogOut
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden block absolute bottom-0 p-2 w-full  bg-white shadow-lg border-t-2`}
        >
          <div className="flex justify-evenly ">
            {routes.map((e) => {
              if (e.isVisibleOnPhn) {
                return (
                  <Link key={e.name} href={e.path}>
                    <div
                      className={` p-3 rounded-lg ${
                        pathURL == e.path
                          ? " bg-[#cbeb66] bg-opacity-80"
                          : "bg-transparent"
                      }  `}
                    >
                      <div className=" relative w-6 h-6 ">
                        <Image
                          alt={e.name}
                          src={e.icon}
                          fill
                          className=" object-contain "
                        />
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </div>
        <div className="w-full h-full p-2 md:p-4">{children}</div>
      </div>
    </>
  );
}

export default NavBar;
