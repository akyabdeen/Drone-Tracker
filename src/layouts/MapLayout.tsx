import { Outlet } from "react-router-dom";
import { DroneCenteringContextProvider } from "../contexts/DroneContext";
import { SocketContextProvider } from "../contexts/SocketContext";

const MapLayout = () => {
    // I realize this is overkill but just for the sake of having everything organized
    return (
    <DroneCenteringContextProvider>
        <SocketContextProvider>
            <Outlet />
        </SocketContextProvider>
    </DroneCenteringContextProvider>
  );
};

export default MapLayout;
