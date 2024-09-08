"use client";
import {app} from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {useSelector} from "react-redux";
import {db} from "@/firebase";
import {usePathname} from "next/navigation";

export const getDocument = async (collection, document) => {
  const querySnapshot = await getDoc(doc(db, collection, document));
  return querySnapshot.data();
};

export const setDocument = async (collection, document, value) => {
  await setDoc(doc(db, collection, document), value);
};

// export const getProjectDetails = async () => {
//   const pathName = usePathname();
//   const project_slug = pathName.slice(14);

//   return new Promise(
//     async (resolve, reject) => {
//       try {
//         const docRef = query(
//           collection(db, "projects"),
//           where("projectSlug", "==", project_slug)
//         );
//         const querySnapshot = await getDocs(docRef);
//         const data = [];
//         querySnapshot.forEach((doc) => {
//           data.push(doc.data());
//         });
//         resolve(data);
//         // console.log(data);
//       } catch (error) {
//         reject(error);
//       }

//       // const getProjectData = async () => {
//       //   try {
//       //     const docRef = query(
//       //       collection(db, "projects"),
//       //       where("projectSlug", "==", project_slug)
//       //     );
//       //     const querySnapshot = await getDocs(docRef);
//       //     querySnapshot.forEach((doc) => {
//       //       return data = doc.data();
//       //       // console.log(data);
//       //     });
//       //   } catch (error) {
//       //     console.error("Error getting project data:", error);
//       //   }
//       // };
//       // getProjectData();
//     },
//     [project_slug]
//   );
// };

export const updateDocument = async (collection, document, value) => {
  await updateDocument(doc(db, collection, document), value);
};

export async function CheckIfDocumentExists(collection, uid, user) {
  const docRef = doc(db, collection, uid);
  const docSnap = await getDoc(docRef);
  if (user && docSnap.data()) {
    if (
      (await docSnap.data().displayName) == (await user.displayName) &&
      (await docSnap.data().photoURL) == (await user.photoURL)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
