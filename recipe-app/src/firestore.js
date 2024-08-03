import { firestore } from "./firebase-config";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";

const pushStringToFirestore = async (userUid, stringData) => {
  try {
    const userDocRef = doc(firestore, "users", userUid);
    await updateDoc(userDocRef, {
      strings: arrayUnion(stringData),
    });
    console.log("String added to Firestore");
  } catch (error) {
    console.error("Error adding string to Firestore", error);
  }
};

export { pushStringToFirestore };
