import "@/assets/styles/global.scss";

import { createApp } from "vue";
import { router } from "@/router/index";
import App from "@/App.vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "chirp-box-blog.firebaseapp.com",
  databaseURL: "https://chirp-box-blog-default-rtdb.firebaseio.com",
  projectId: "chirp-box-blog",
  storageBucket: "chirp-box-blog.appspot.com",
  messagingSenderId: "927071874430",
  appId: "1:927071874430:web:da47066c5f282aa46b572f",
};

const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}
