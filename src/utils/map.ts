import { Map as MapboxMap, Marker, Popup } from "mapbox-gl";
import { createDroneMarker } from "../components/HTML-Creators/DroneMarker";
import type { DroneData } from "../interfaces/drone";
import { createDronePopup } from "../components/HTML-Creators/PopUp";
import { SAGER_GREEN, SAGER_RED } from "../constants/map";

export const createMapMarker = (
  map: MapboxMap,
  canFly: boolean,
  drone: DroneData,
  onDroneIconClick: () => void,
) => {
  const popup = new Popup({
    offset: 25,
    closeButton: false,
    closeOnClick: false,
  }).setHTML(createDronePopup(drone));

  const markerElement = createDroneMarker(canFly, onDroneIconClick);

  const marker = new Marker({
    element: markerElement,
  }).setLngLat(drone.currentPosition);

  marker.addTo(map);

  markerElement.addEventListener("mouseenter", () => {
    popup.setLngLat(drone.currentPosition).addTo(map);
  });

  markerElement.addEventListener("mouseleave", () => {
    popup.remove();
  });

  return marker;
};

export const updateMarkerStyle = (marker: Marker, canFly: boolean) => {
  const markerElement = marker.getElement();
  if (markerElement) {
    const color = canFly ? SAGER_GREEN : SAGER_RED;
    const colorElements = markerElement.querySelectorAll("[data-drone-color]");
    colorElements.forEach((el) => {
      (el as HTMLElement).style.backgroundColor = color;
    });
  }
};
