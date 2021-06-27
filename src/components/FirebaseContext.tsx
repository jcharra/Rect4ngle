import firebase from "firebase";
import React from "react";
import { useList } from "react-firebase-hooks/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnsYAnaSM-t9_rQGtPeQgqcIAscuo6YOw",
  authDomain: "rect4ngle.firebaseapp.com",
  projectId: "rect4ngle",
  storageBucket: "rect4ngle.appspot.com",
  messagingSenderId: "846884312237",
  appId: "1:846884312237:web:aa66f78577530488bd6224",
  measurementId: "G-K20GR0K3G7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function FirebaseContext() {
  const [snapshots, loading, error] = useList(
    firebase.database().ref("scores")
  );

  return loading && snapshots ? (
    <span>Loading</span>
  ) : (
    <ul>
      {snapshots?.map((s) => (
        <li>s.val</li>
      ))}
    </ul>
  );
}
