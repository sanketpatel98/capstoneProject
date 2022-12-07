import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBDJg03urd90c0SSzZ4aZcPmIKoxGx2AE",
  authDomain: "capstone-project-8ea89.firebaseapp.com",
  databaseURL: "https://capstone-project-8ea89-default-rtdb.firebaseio.com",
  projectId: "capstone-project-8ea89",
  storageBucket: "capstone-project-8ea89.appspot.com",
  messagingSenderId: "312815711324",
  appId: "1:312815711324:web:45e4e40580933462612299",
  measurementId: "G-E103T7GMN8",
};

const app = firebase.initializeApp(firebaseConfig)
export { firebase };
export { app };

// const fb = null

// if (!firebase.app.length) {
//   fb = firebase.initializeApp(firebaseConfig);
//   console.log(firebase);
// }

// export { fb };
