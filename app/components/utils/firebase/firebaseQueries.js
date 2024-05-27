import {app} from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore(app);

export const getDocument = async (uid) => {
  const querySnapshot = await getDoc(doc(db, "users", uid));
  return querySnapshot.data();
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //     return doc.data();
  //   });
};
