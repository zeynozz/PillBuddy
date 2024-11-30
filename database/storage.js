/**
 * Firebase Medication Management Module
 * This module handles CRUD operations for medications and logs in Firebase Firestore.
*/

import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

/**
 * Save a new medication to the "medications" collection in Firestore.
 * @param {Object} medication - The medication data to be saved.
 * @returns {string} - The ID of the saved medication document.
 * @throws Will throw an error if the save operation fails.
 */
export const saveMedication = async (medication) => {
    try {
        const docRef = await addDoc(collection(db, "medications"), medication);
        console.log("Medication successfully saved to Firebase with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving medication to Firebase:", error);
        throw error;
    }
};

/**
 * Fetch all medications from the "medications" collection in Firestore.
 * @returns {Array} - An array of medication objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const fetchMedications = async () => {
    try {
        const medicationCollection = collection(db, "medications");
        const snapshot = await getDocs(medicationCollection);
        const medications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Medications successfully fetched:", medications);
        return medications;
    } catch (error) {
        console.error("Error fetching medications:", error);
        throw error;
    }
};

/**
 * Delete a medication from the "medications" collection in Firestore.
 * @param {string} id - The ID of the medication to be deleted.
 * @throws Will throw an error if the delete operation fails.
 */
export const deleteMedication = async (id) => {
    try {
        const medicationDoc = doc(db, "medications", id);
        await deleteDoc(medicationDoc);
        console.log("Medication successfully deleted with ID:", id);
    } catch (error) {
        console.error("Error deleting medication:", error);
        throw error;
    }
};

/**
 * Save a medication log to the "medicationLogs" collection in Firestore.
 * @param {Object} log - The log data to be saved.
 * @returns {string} - The ID of the saved log document.
 * @throws Will throw an error if the save operation fails.
 */
export const saveMedicationLog = async (log) => {
    try {
        const docRef = await addDoc(collection(db, "medicationLogs"), log);
        console.log("Medication log successfully saved with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving medication log:", error);
        throw error;
    }
};

/**
 * Fetch medication logs by a specific date from the "medicationLogs" collection in Firestore.
 * @param {string} date - The date to filter logs by (format: YYYY-MM-DD).
 * @returns {Array} - An array of log objects for the specified date.
 * @throws Will throw an error if the fetch operation fails.
 */
export const fetchMedicationLogsByDate = async (date) => {
    try {
        const medicationLogsCollection = collection(db, "medicationLogs");
        const dateQuery = query(medicationLogsCollection, where("date", "==", date));
        const snapshot = await getDocs(dateQuery);
        const logs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(`Medication logs for ${date} successfully fetched:`, logs);
        return logs;
    } catch (error) {
        console.error("Error fetching medication logs:", error);
        throw error;
    }
};
