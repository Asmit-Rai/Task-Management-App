import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKhJzx-btFhJbA2PFxJfoZJ21DgozTLvU",
  authDomain: "task-management-app-02.firebaseapp.com",
  projectId: "task-management-app-02",
  storageBucket: "task-management-app-02.appspot.com", 
  messagingSenderId: "615137036117",
  appId: "1:615137036117:web:b5a0e0a5bd0190946151dc",
  measurementId: "G-MJ837D1T77"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 