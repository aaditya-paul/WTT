import {app} from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {useSelector} from "react-redux";
const db = getFirestore(app);

export const getDocument = async (uid) => {
  const querySnapshot = await getDoc(doc(db, "users", uid));
  return querySnapshot.data();
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //     return doc.data();
  //   });
};
export const setDocument = async (collection, uid, value) => {
  await setDoc(doc(db, collection, uid), value);
};

export async function CheckIfDocumentExists(collection, uid, user) {
  // const user = useSelector((state) => state.authState.user);
  const docRef = doc(db, collection, uid);
  const docSnap = await getDoc(docRef);
  if (user) {
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
