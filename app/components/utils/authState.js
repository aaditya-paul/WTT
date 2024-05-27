import {configureStore, createSlice} from "@reduxjs/toolkit";
import {app} from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
const dp = getFirestore(app);

const initialState = {
  uid: "",
  email: "",
  userDetails: {},
  authProvider: "",
  photoURL: "",
  displayName: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.uid = user.uid;
      state.email = user.email;
      state.displayName = user.displayName ? user.displayName : "";
    },
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    changeAuthProvider: (state, action) => {
      state.authProvider = action.payload;
    },
  },
});

export const {addUser, addUserDetails, changeAuthProvider} = userSlice.actions;

export const userStore = configureStore({
  reducer: userSlice.reducer,
});
