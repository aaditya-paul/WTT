"use client";

import React, {useEffect, useState} from "react";
import {getDocument} from "@/app/components/utils/firebase/firebaseQueries";
import {usePathname} from "next/navigation";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase";
import LoadingScreen from "@/app/components/loadingScreen";
import Head from "next/head";

function Page() {
  const pathName = usePathname();

  const project_slug = pathName.slice(14);
  const [project, setProject] = useState();

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const docRef = await query(
          collection(db, "projects"),
          where("projectSlug", "==", project_slug)
        );
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setProject(data);
          //   console.log(data);
        });
      } catch (error) {
        console.error("Error getting project data:", error);
      }
    };
    getProjectData();
  }, [project_slug]);

  console.log(project);

  if (!project) {
    return <LoadingScreen />;
  } else {
    return (
      <div>
        <title>{project.projectName}</title>
        <h1>{project.projectName}</h1>
        <p>{project.ProjectDescription}</p>
      </div>
    );
  }
}

export default Page;
