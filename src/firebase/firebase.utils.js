import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCpBEuA4C20FKuT4AIiu2M-sdyj0Rc-2Iw",
  authDomain: "ecom-a82fb.firebaseapp.com",
  databaseURL: "https://ecom-a82fb.firebaseio.com",
  projectId: "ecom-a82fb",
  storageBucket: "ecom-a82fb.appspot.com",
  messagingSenderId: "942224850217",
  appId: "1:942224850217:web:2191d6d5db72117a298b38",
  measurementId: "G-GKMRV6KRR7"
};

export const createUserProfileDocument = async (userAuth, additionalDate) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalDate
      });
    } catch (error) {
      console.log("Error createin user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
