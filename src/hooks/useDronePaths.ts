import { useEffect } from "react";
import type { DroneData } from "../interfaces/drone";
import { canDroneFly, createPathGeoJSON } from "../utils/drone";
import type { Map as MapboxMap } from "mapbox-gl";
import { SAGER_GREEN, SAGER_RED } from "../constants/map";

export const useDronePaths = (
  map: MapboxMap | null,
  drones: Map<string, DroneData>,
  isMapLoaded: boolean
) => {
  useEffect(() => {
    if (!map || !isMapLoaded) return;

    drones.forEach((drone: DroneData, registration_code: string) => {
      const sourceId = `drone-path-${registration_code}`;
      const layerId = `drone-layer-${registration_code}`;
      const canFly = canDroneFly(registration_code);
      const pathColor = canFly ? SAGER_GREEN : SAGER_RED;
      const pathGeoJSON = createPathGeoJSON(registration_code, canFly, drone);

      if (map.getSource(sourceId)) {
        (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(pathGeoJSON);
        if (map.getLayer(layerId)) {
          map.setPaintProperty(layerId, "line-color", pathColor);
        }
      } else {
        map.addSource(sourceId, {
          type: "geojson",
          data: pathGeoJSON,
        });

        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": pathColor,
            "line-width": 3,
          },
        });
      }
    });
  }, [map, drones, isMapLoaded]);
};
