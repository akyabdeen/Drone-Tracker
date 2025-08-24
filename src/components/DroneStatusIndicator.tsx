import { useSocketDroneData } from "../contexts/SocketContext";
import { cannotFlyCount } from "../utils/drone";

const DroneStatusIndicator = () => {
  const { drones } = useSocketDroneData();

  return (
    <div className="absolute bottom-4 right-4 z-30 bg-white bg-opacity-90 text-sager-dark-gray rounded-lg shadow-lg overflow-hidden">
    
      <div className="flex items-center px-3 py-2">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3">
          {cannotFlyCount(Array.from(drones.values()))}
        </div>
        <span className="text-sm font-medium">Unauthorized Flying</span>
      </div>
    </div>
  );
};

export default DroneStatusIndicator;
