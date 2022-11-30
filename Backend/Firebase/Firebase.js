// Import the functions you need from the SDKs you need
const {initializeApp} = require("firebase/app");
const {getAuth} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCBDJg03urd90c0SSzZ4aZcPmIKoxGx2AE",
  authDomain: "capstone-project-8ea89.firebaseapp.com",
  projectId: "capstone-project-8ea89",
  storageBucket: "capstone-project-8ea89.appspot.com",
  messagingSenderId: "312815711324",
  appId: "1:312815711324:web:45e4e40580933462612299",
  measurementId: "G-E103T7GMN8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
module.exports = {
  auth: auth,
};

// const analytics = getAnalytics(app);
