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
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? process.env.API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? process.env.AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? process.env.PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? process.env.STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ??
    process.env.MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID ?? process.env.APP_ID,
  measurementId:
    process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? process.env.MEASUREMENT_ID,
};

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Initialize Firebase only in browser
let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof initializeAuth | typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;

if (isBrowser) {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
  });
  db = getFirestore(app);

  if (
    process.env.NEXT_PUBLIC_USE_EMULATOR === "true" ||
    process.env.USE_EMULATOR === "true"
  ) {
    connectFirestoreEmulator(db, "localhost", 6767);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
}

export { app, auth, db, analytics };
