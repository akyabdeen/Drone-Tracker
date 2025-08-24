import type { DroneData } from "../../interfaces/drone";
import { minutesSince } from "../../utils/drone";

export function createDronePopup(drone: DroneData): string {
  const flightTime = drone.firstAppearance
    ? new Date(minutesSince(drone.firstAppearance) * 60 * 1000)
        .toISOString()
        .substring(11, 19)
    : "N/A";

  const altitude = drone.altitude
    ? `${drone.altitude.toFixed(1)} m`
    : "N/A";

  return `
    <div class="relative bg-black text-white rounded-lg shadow-lg px-4 py-3 min-w-[180px] text-center">
      <div class="font-bold text-sm">
        ${drone.name || "Unknown Drone"}
      </div>
      <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div>
          <div class="opacity-70">Altitude</div>
          <div class="font-bold text-sm">${altitude}</div>
        </div>
        <div>
          <div class="opacity-70">Flight Time</div>
          <div class="font-bold text-sm">${flightTime}</div>
        </div>
      </div>
      <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 
                  border-l-8 border-l-transparent 
                  border-r-8 border-r-transparent 
                  border-t-8 border-t-black"></div>
    </div>
  `;
}
