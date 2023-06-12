import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const getMyProfileData = async () => {
  if (auth.currentUser === null) {
    return {};
  }
  const snapshot = await getDoc(doc(db, "patients", auth?.currentUser?.uid));
  return snapshot.data();
};

export const updateProfile = async (profile) => {
  return await setDoc(doc(db, "patients", auth.currentUser.uid), profile, {
    merge: true,
  });
};

export const signUpwithEmailandPass = async (profile) => {
  createUserWithEmailAndPassword(auth, profile.email, profile.password).then(
    (cred) => {
      // creating patients document
      setDoc(doc(db, "patients", cred.user.uid), {
        ...profile,
        createdAt: new Date(),
        creator: "",
        hospitals: [],
      }).then(() => console.log("HOllllllllla", cred.user.uid));
    }
  );
};
