import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./firebaseKey.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

console.log("Firebase connected");

export default db;