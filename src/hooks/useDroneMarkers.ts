import type { Map as MapboxMap, Marker } from "mapbox-gl";
import { useEffect, useRef } from "react";
import type { DroneData } from "../interfaces/drone";
import { canDroneFly } from "../utils/drone";
import { createMapMarker, updateMarkerStyle } from "../utils/map";
import { useSelectedDrone } from "../contexts/DroneContext";

export const useDroneMarkers = (
  map: MapboxMap | null,
  drones: Map<string, DroneData>,
  isMapLoaded: boolean
) => {
  const { setSelectedDrone, toggleIsTracking } = useSelectedDrone();
  const markersRef = useRef<Map<string, Marker>>(new Map());

  useEffect(() => {
    drones.forEach((drone: DroneData, registration_code: string) => {
      if (!map || !isMapLoaded) return;

      const currentMarkers = new Set(markersRef.current.keys());

      const canFly = canDroneFly(registration_code);
      let marker = markersRef.current.get(registration_code);

      if (marker) {
        marker.setLngLat(drone.currentPosition);
        updateMarkerStyle(marker, canFly);
      } else {
        const marker = createMapMarker(map, canFly, drone, () => {
          const seletedDroneData = {
            registration_code,
            data: drone,
          };
          setSelectedDrone(seletedDroneData);
          toggleIsTracking();
          map.flyTo({
            center: drone.currentPosition,
            zoom: 16,
            duration: 500,
          });
        });
        markersRef.current.set(registration_code, marker);
      }

      currentMarkers.delete(registration_code);
    });
  }, [map, drones, isMapLoaded]);
};
