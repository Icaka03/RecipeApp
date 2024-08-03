import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAh4ZbQjgIVO-MmnwrEfAx97hw-hZ_zk6U",
  authDomain: "recipe-app-12503.firebaseapp.com",
  projectId: "recipe-app-12503",
  storageBucket: "recipe-app-12503.appspot.com",
  messagingSenderId: "718046249173",
  appId: "1:718046249173:web:addbfd48f92556330d225c",
  measurementId: "G-KSBP4ZFW6X",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const isAnonymous = result.user.isAnonymous;
      const profileImg = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("isAnonymous", isAnonymous);
      localStorage.setItem("profileImg", profileImg);
      console.log(result);

      const user = result.user;
      const userDocRef = doc(firestore, "users", user.uid);
      setDoc(
        userDocRef,
        {
          displayName: user.displayName,
          email: user.email,
          createdAt: new Date(),
          strings: [],
        },
        { merge: true }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
