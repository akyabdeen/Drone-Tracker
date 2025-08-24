import { useEffect, useRef } from "react";
import { VITE_MAP_ACCESS_TOKEN } from "../constants/shared";
import mapboxgl from "mapbox-gl";
import { MAP_CONFIG } from "../constants/map";

export const useMap = (
  mapContainerRef: React.RefObject<HTMLDivElement | null>,
  setIsMapLoaded: (isMapLoaded: boolean) => void
) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = VITE_MAP_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      ...(MAP_CONFIG as any),
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapContainerRef]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const handleLoad = () => setIsMapLoaded(true);

    if (map.isStyleLoaded()) {
      setIsMapLoaded(true);
    } else {
      map.on("load", handleLoad);
    }

    return () => {
      map.off("load", handleLoad);
    };
  }, [mapRef.current]);

  return mapRef;
};
