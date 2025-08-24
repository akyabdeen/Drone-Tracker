import type { DroneData } from "../interfaces/drone";

export function canDroneFly(droneRegistration: string) {
  // very basic and assumes it's always SD-.. with two values
  const [, id] = droneRegistration.split("-");

  return id[0] == "B";
}

export function cannotFlyCount(data: DroneData[]) {
  return data.reduce((count, drone) => {
    return canDroneFly(drone.registration) ? count : count + 1;
  }, 0);
}

export function minutesSince(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // difference in milliseconds
  return Math.floor(diffMs / 1000 / 60);
}

export function createPathGeoJSON(serial: string, canFly: boolean, drone: DroneData) {
  return {
    type: "Feature" as const,
    geometry: {
      type: "LineString" as const,
      coordinates: drone.path,
    },
    properties: {
      serial,
      canFly,
      registration: drone.registration,
    } as {[key: string] : any},
  };
}
