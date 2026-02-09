import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  connectAuthEmulator, 
  getAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});
export const db = getFirestore(app);

if (process.env.USE_EMULATOR === "true") {
  connectFirestoreEmulator(db, "localhost", 6767);
  connectAuthEmulator(auth, "http://localhost:9099");
}
