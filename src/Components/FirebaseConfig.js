import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo_63Qp_aNFH9xA1bnaa5GYna_IV5GCk0",
  authDomain: "entregafinalcoderhouse.firebaseapp.com",
  projectId: "entregafinalcoderhouse",
  storageBucket: "entregafinalcoderhouse.appspot.com",
  messagingSenderId: "332751214648",
  appId: "1:332751214648:web:caa47df8a72811058beecd",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
