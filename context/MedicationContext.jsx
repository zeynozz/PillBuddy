import React, { createContext, useState } from "react";

export const MedicationContext = createContext();

export const MedicationProvider = ({ children }) => {
    const [selectedMedications, setSelectedMedications] = useState([]);

    const addMedication = (medication) => {
        setSelectedMedications((prev) => [...prev, medication]);
    };

    return (
        <MedicationContext.Provider value={{ selectedMedications, addMedication }}>
            {children}
        </MedicationContext.Provider>
    );
};
