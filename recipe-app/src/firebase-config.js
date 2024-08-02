import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAh4ZbQjgIVO-MmnwrEfAx97hw-hZ_zk6U",
  authDomain: "recipe-app-12503.firebaseapp.com",
  projectId: "recipe-app-12503",
  storageBucket: "recipe-app-12503.appspot.com",
  messagingSenderId: "718046249173",
  appId: "1:718046249173:web:addbfd48f92556330d225c",
  measurementId: "G-KSBP4ZFW6X",
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
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
    })
    .catch((err) => {
      console.log(err);
    });
};
