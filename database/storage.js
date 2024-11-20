import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

export const saveMedication = async (medication) => {
    try {
        const docRef = await addDoc(collection(db, "medications"), medication);
        console.log("Daten erfolgreich in Firebase gespeichert mit ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Fehler beim Speichern in Firebase:", error);
        throw error;
    }
};
