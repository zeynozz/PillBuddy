import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//muss noch weg oder in gitignore rein
const firebaseConfig = {
    apiKey: "AIzaSyBayWP_PKyf9oN95YypNqEJLsZwgfEX4go",
    authDomain: "pillbuddy.firebaseapp.com",
    projectId: "pillbuddy-fb492",
    storageBucket: "pillbuddy-fb492.appspot.com",
    messagingSenderId: "451359923731",
    appId: "1:451359923731:ios:5d1d703a993d9bba5429e6",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
