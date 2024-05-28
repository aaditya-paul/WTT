import {app} from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
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
export const setDocument = async (collection, uid, value) => {
  await setDoc(doc(db, collection, uid), value);
};

export async function checkIfDocumentExists(collection, uid) {
  const docRef = doc(db, collection, uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
}
