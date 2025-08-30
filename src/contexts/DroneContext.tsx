import { createContext, useContext, useState, type ReactNode } from "react";
import type { DroneData } from "../interfaces/drone";

interface DroneCenteringContextType {
    selectedDrone: {registration_code: string, data: DroneData} | null;
    setSelectedDrone: (selectedDrone: {registration_code: string, data: DroneData}) => void;
    isTracking: boolean;
    toggleIsTracking: () => void;
}

const DroneCenteringContext = createContext<DroneCenteringContextType | undefined>(undefined);

export function DroneCenteringContextProvider({children}: {children: ReactNode}) {
    const [selectedDrone, setSelectedDrone] = useState<{registration_code: string, data: DroneData} | null>(null);
    const [isTracking, setIsTracking] = useState<boolean>(false);

    const toggleIsTracking = () => {
        setIsTracking(prev => !prev);
    }

    const value = {
        selectedDrone,
        setSelectedDrone,
        isTracking,
        toggleIsTracking
    }

    //const focusOnDrone = (droneId: number) => {
    //    // do something
    //}

    return <DroneCenteringContext.Provider value={value}>{children}</DroneCenteringContext.Provider>
}

export function useSelectedDrone() {
    const context = useContext(DroneCenteringContext);
    if (!context) {
        throw new Error("useSelectedDrone must be used within a DroneCenteringContext");
    }
    return context;
}
