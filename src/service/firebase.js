import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxQ4jlisLR_t3rFoYJVSLmq2PTzFdIgBs",
  authDomain: "shopify-image-repository-31abe.firebaseapp.com",
  projectId: "shopify-image-repository-31abe",
  storageBucket: "shopify-image-repository-31abe.appspot.com",
  messagingSenderId: "100795993464",
  appId: "1:100795993464:web:521cee5330b01596da4c8d",
  measurementId: "G-C3J4B2CD28"
};

firebase.initializeApp(firebaseConfig);

export {firebase}