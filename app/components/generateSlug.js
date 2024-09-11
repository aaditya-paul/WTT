import {db} from "@/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import React from "react";

function GenerateSlug(text, setSlug, searchDatabase = false, datatype) {
  var q;
  if (text == "" || text == null || text == undefined) {
    return null;
  } else {
    const slug = text.replace(/ /g, "-").replace(/[^\w-]+/g, "");
    if (!searchDatabase) {
      setSlug(slug);
      return slug;
    } else {
      if (datatype == "projects") {
        q = query(collection(db, "projects"), where("projectSlug", "==", slug));
      } else if (datatype == "tasks") {
        //
      }
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          console.log("Slug already exists");
          setSlug(slug + "01");
        } else {
          setSlug(slug);
        }
      });
    }

    // return slug;
  }
  //   console.log(text);

  return <div>GenerateSlug</div>;
}

export default GenerateSlug;
