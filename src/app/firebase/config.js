import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfOFSro4cicscw5P8ebvdaGvuiiO_1j2M",
  authDomain: "top-movie-76e67.firebaseapp.com",
  projectId: "top-movie-76e67",
  storageBucket: "top-movie-76e67.appspot.com",
  messagingSenderId: "291233456576",
  appId: "1:291233456576:web:e6e7bada94404323ce6825",
};

  export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
