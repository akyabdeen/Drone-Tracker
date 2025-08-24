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
    drones.forEach((drone: DroneData, serial: string) => {
      if (!map || !isMapLoaded) return;

      const currentMarkers = new Set(markersRef.current.keys());

      const canFly = canDroneFly(drone.registration);
      let marker = markersRef.current.get(serial);

      if (marker) {
        marker.setLngLat(drone.currentPosition);
        updateMarkerStyle(marker, canFly);
      } else {
        const marker = createMapMarker(map, canFly, drone, () => {
          const seletedDroneData = {
            serial,
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
        markersRef.current.set(serial, marker);
      }

      currentMarkers.delete(serial);
    });
  }, [map, drones, isMapLoaded]);
};
