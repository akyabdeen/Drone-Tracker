import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import type {
    DroneData,
    DroneFeature,
    DroneFeatureCollection,
} from "../interfaces/drone";

interface SocketContextType {
  drones: Map<string, DroneData>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketContextProvider({ children }: { children: ReactNode }) {
  const [drones, setDrones] = useState<Map<string, DroneData>>(new Map<string, DroneData>()); // where the key is the serial number - O(1) access time but takes up more space

  useEffect(() => {
    const socket: Socket = io("http://localhost:9013", {
      transports: ["polling"],
    });

    socket.on("message", (data: DroneFeatureCollection) => {
      const features: DroneFeature[] = data.features;

      setDrones((prev) => {
        const updated = new Map(prev);

        features.forEach((drone) => {
          const registration = drone.properties.registration;
          const coord = drone.geometry.coordinates;

          let prevDroneData = updated.get(registration);

          if (prevDroneData) {
            // update already existing data in state
            prevDroneData.path.push(coord);
            prevDroneData.currentPosition = coord;
          } else {
            const newDrone: DroneData = {
              name: drone.properties.Name,
              serial: drone.properties.serial,
              altitude: drone.properties.altitude,
              organization: drone.properties.organization,
              pilot: drone.properties.pilot,
              firstAppearance: new Date(),
              currentPosition: coord,
              path: [coord],
            };

            updated.set(registration, newDrone);
          }
        });

        return updated;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        drones,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketDroneData() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "Socket drone data cannot be accessed outside of SocketContextProvider"
    );
  }

  return context;
}
