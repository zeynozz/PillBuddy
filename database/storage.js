import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const saveMedication = async (medication) => {
    try {
        const docRef = await addDoc(collection(db, 'medications'), medication);
        console.log('Medication saved with ID:', docRef.id);
    } catch (e) {
        console.error('Error adding document:', e);
    }
};
