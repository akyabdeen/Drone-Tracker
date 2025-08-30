import type { DroneData } from "../interfaces/drone";

export function canDroneFly(droneRegistration: string) {
  // very basic and assumes it's always SD-.. with two values
  const [, id] = droneRegistration.split("-");

  return id[0] == "B";
}

export function cannotFlyCount(data: string[]) {
  return data.reduce((count, drone_registration) => {
    return canDroneFly(drone_registration) ? count : count + 1;
  }, 0);
}

export function minutesSince(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // difference in milliseconds
  return Math.floor(diffMs / 1000 / 60);
}

export function createPathGeoJSON(registration: string, canFly: boolean, drone: DroneData) {
  return {
    type: "Feature" as const,
    geometry: {
      type: "LineString" as const,
      coordinates: drone.path,
    },
    properties: {
      serial: drone.serial,
      canFly,
      registration,
    } as {[key: string] : any},
  };
}
