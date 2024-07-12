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

export const getDocument = async (collection, document) => {
  const querySnapshot = await getDoc(doc(db, collection, document));
  return querySnapshot.data();
};

export const setDocument = async (collection, document, value) => {
  await setDoc(doc(db, collection, document), value);
};
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
