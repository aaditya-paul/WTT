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
const db = getFirestore(app);

export const getDocument = async (collection, document) => {
  const querySnapshot = await getDoc(doc(db, collection, document));
  return querySnapshot.data();
};
// export const getQueriedDocuments = async (
//   collec,
//   queryField,
//   queryComparator,
//   queryValue
// ) => {
//   if (queryValue) {
//     const q = query(
//       collection(db, collec),
//       where(queryField, queryComparator, queryValue)
//     );
//     const querySnapshot = await getDocs(q);

//     const projectsArray = [];
//     querySnapshot.forEach((doc) => {
//       projectsArray.push({id: doc.id, ...doc.data()});
//     });
//     return projectsArray;
//   }
// };
export const setDocument = async (collection, document, value) => {
  await setDoc(doc(db, collection, document), value);
};
export const updateDocument = async (collection, document, value) => {
  await updateDocument(doc(db, collection, document), value);
};

export async function CheckIfDocumentExists(collection, uid, user) {
  // const user = useSelector((state) => state.authState.user);
  const docRef = doc(db, collection, uid);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data());
  if (user && docSnap.data()) {
    if (
      (await docSnap.data().displayName) == (await user.displayName) &&
      (await docSnap.data().photoURL) == (await user.photoURL)
    ) {
      // console.log("true");
      return true;
    } else {
      // console.log("false");
      return false;
    }
  }
  // return docSnap.exists();
}
