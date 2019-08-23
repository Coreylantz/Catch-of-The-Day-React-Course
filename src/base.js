import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAT4MkpsJm57z6uBrl9gBWiNtvrESxJ0Ec",
  authDomain: "catch-of-the-day-corey-lantz.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-corey-lantz.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp }

// this is a default export
export default base;