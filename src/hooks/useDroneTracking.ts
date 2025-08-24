import { useEffect } from "react";
import type { Map as MapboxMap } from "mapbox-gl";
import type { DroneData } from "../interfaces/drone";
import { useSelectedDrone } from "../contexts/DroneContext";

export const useDroneTracking = (
  map: MapboxMap | null,
  drones: Map<string, DroneData>,
  selectedDrone: { data: DroneData; serial: string } | null
) => {
  const { isTracking } = useSelectedDrone();

  useEffect(() => {
    if (!map || !selectedDrone || !isTracking) return;

    const currentDroneData = Array.from(drones.values()).find(
      (drone) => drone.registration === selectedDrone.data.registration
    );

    if (currentDroneData?.currentPosition) {
      map.easeTo({
        center: currentDroneData.currentPosition,
        duration: 1000,
        essential: true,
      });
    }
  }, [map, drones, selectedDrone, isTracking]);

  useEffect(() => {
    if (!map || !selectedDrone || isTracking) return;

    if (selectedDrone.data.currentPosition) {
      map.flyTo({
        center: selectedDrone.data.currentPosition,
        zoom: 12,
        duration: 1500,
      });
    }
  }, [map, selectedDrone, isTracking]);
};
