import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhc-n3XNhebVtghToYabQBoXe24tiWNlY",
    authDomain: "ratemytube.firebaseapp.com",
    databaseURL: "https://ratemytube-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ratemytube",
    storageBucket: "ratemytube.appspot.com",
    messagingSenderId: "24308797244",
    appId: "1:24308797244:web:1ca372afb28ea0d5a75839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);
export const firebaseDatabase = getDatabase(app);
