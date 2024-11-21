import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export const saveMedication = async (medication) => {
    try {
        const docRef = await addDoc(collection(db, "medications"), medication); // Medikament in der "medications"-Collection speichern
        console.log("Daten erfolgreich in Firebase gespeichert mit ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Fehler beim Speichern in Firebase:", error);
        throw error;
    }
};

export const fetchMedications = async () => {
    try {
        const medicationCollection = collection(db, "medications");
        const snapshot = await getDocs(medicationCollection);
        const medications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Medikamente erfolgreich abgerufen:", medications);
        return medications;
    } catch (error) {
        console.error("Fehler beim Abrufen der Medikamente:", error);
        throw error;
    }
};

export const deleteMedication = async (id) => {
    try {
        const medicationDoc = doc(db, "medications", id);
        await deleteDoc(medicationDoc);
        console.log("Medikament erfolgreich gelöscht:", id);
    } catch (error) {
        console.error("Fehler beim Löschen des Medikaments:", error);
        throw error;
    }
};
