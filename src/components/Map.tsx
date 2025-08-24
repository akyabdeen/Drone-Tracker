import { Navigation, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSelectedDrone } from "../contexts/DroneContext";
import { useSocketDroneData } from "../contexts/SocketContext";
import { useDroneMarkers } from "../hooks/useDroneMarkers";
import { useDronePaths } from "../hooks/useDronePaths";
import { useDroneTracking } from "../hooks/useDroneTracking";
import { useMap } from "../hooks/useMap";
import DroneSidebar from "./DroneSidebar";
import DroneSidebarToggle from "./DroneSidebarToggle";
import Spinner from "./Spinner";
import DroneStatusIndicator from "./DroneStatusIndicator";

const MapComponent = () => {
  const { drones } = useSocketDroneData();
  const { selectedDrone, isTracking, toggleIsTracking } = useSelectedDrone();

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useMap(mapContainerRef, setIsMapLoaded);

  useDroneMarkers(mapRef.current, drones, isMapLoaded);
  useDronePaths(mapRef.current, drones, isMapLoaded);
  useDroneTracking(mapRef.current, drones, selectedDrone);

  return (
    <div className="h-full w-full relative">
      <div id="map-container" ref={mapContainerRef} className="w-full h-full" />

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Spinner />
        </div>
      )}

      {isTracking && selectedDrone && (
        <div className="absolute top-4 right-4 z-30 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Navigation size={16} className="animate-pulse" />
          <span className="text-sm font-medium">
            Tracking {selectedDrone.data.name || "Drone"}
          </span>
          <button
            onClick={() => toggleIsTracking()}
            className="ml-2 p-1 hover:bg-green-700 rounded-full transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <DroneSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {!isSidebarOpen && (
        <DroneSidebarToggle onClick={() => setIsSidebarOpen(true)} />
      )}

      <DroneStatusIndicator />
    </div>
  );
};

export default MapComponent;
