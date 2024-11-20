import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBayWP_PKyf9oN95YypNqEJLsZwgfEX4go",
    authDomain: "com.company.pillbuddy",
    projectId: "pillbuddy",
    storageBucket: "pillbuddy-fb492.firebasestorage.app",
    messagingSenderId: "451359923731",
    appId: "1:451359923731:ios:5d1d703a993d9bba5429e6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
