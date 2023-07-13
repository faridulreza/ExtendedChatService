import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj6NdLQS_KQevq_Lma_YewzIrSsTkcw8o",
  authDomain: "buet-hackathon-bdf5e.firebaseapp.com",
  databaseURL: "https://buet-hackathon-bdf5e-default-rtdb.firebaseio.com",
  projectId: "buet-hackathon-bdf5e",
  storageBucket: "buet-hackathon-bdf5e.appspot.com",
  messagingSenderId: "282944913182",
  appId: "1:282944913182:web:51e3317dc778785308130f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
