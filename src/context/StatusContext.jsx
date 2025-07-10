import { createContext } from "react";

export const StatusContext = createContext({});

function translateStatus(status) {
    const translateStatus = {
        PENDING: "In afwachting",
        APPROVED: "Goedgekeurd",
        DENIED: "Afgewezen",
        INPROGRESS: "In behandeling",
    };
    return translateStatus[status];
}

const statusOptions = [
    { value: "PENDING", label: "In afwachting" },
    { value: "APPROVED", label: "Goedgekeurd" },
    { value: "DENIED", label: "Afgewezen" },
    { value: "INPROGRESS", label: "In behandeling" }
];

export function StatusContextProvider({ children }) {

    return (
        <StatusContext.Provider value={{translateStatus, statusOptions}}>
            {children}
            </StatusContext.Provider>
    );
}