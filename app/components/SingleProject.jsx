"use client";

import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase";
import LoadingScreen from "@/app/components/loadingScreen";
import {useSelector} from "react-redux";
import Head from "next/head";

function SingleProject() {
  const pathName = usePathname();
  const project_slug = pathName.slice(14);

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  const user = useSelector((state) => state.authState.user);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const docRef = query(
          collection(db, "projects"),
          where("projectSlug", "==", project_slug)
        );
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setProject(data);
          console.log(data);
        });
      } catch (error) {
        console.error("Error getting project data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjectData();
  }, [project_slug]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (project) {
    if (project.members.includes(user.uid)) {
      return (
        <div>
          <title>{"WTT - " + project?.projectName}</title>
          <h1>{project.projectName}</h1>
          <p>{project.projectDescription}</p>
        </div>
      );
    } else {
      return <div>No permission</div>;
    }
  } else {
    return <div>Project not found</div>;
  }
}

export default SingleProject;
