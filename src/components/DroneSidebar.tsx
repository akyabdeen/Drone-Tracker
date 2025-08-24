import { useMemo, useState } from "react";
import type { DroneData } from "../interfaces/drone";
import { useSocketDroneData } from "../contexts/SocketContext";
import { useSelectedDrone } from "../contexts/DroneContext";
import { canDroneFly } from "../utils/drone";
import { Navigation, X } from "lucide-react";

const DroneSidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('drones');
  const { drones } = useSocketDroneData();
  const { selectedDrone, setSelectedDrone, toggleIsTracking, isTracking } = useSelectedDrone();

  const handleToggleTracking = (drone: DroneData, serial: string) => {
    setSelectedDrone({ data: drone, serial });
    toggleIsTracking();
  };

  const sortedDrones = useMemo(() => {
    const droneEntries = Array.from(drones.entries());
    if (!selectedDrone) return droneEntries;

    const selected = droneEntries.find(([_, drone]) => 
      drone.registration === selectedDrone.data.registration
    );
    const others = droneEntries.filter(([_, drone]) => 
      drone.registration !== selectedDrone.data.registration
    );

    return selected ? [selected, ...others] : droneEntries;
  }, [drones, selectedDrone]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute top-2 left-2 w-80 sm:w-72 max-w-[calc(100vw-1rem)] h-[60vh] sm:h-[70vh] lg:h-[80vh] max-h-[calc(100vh-1rem)] bg-sager-black text-white shadow-2xl z-40 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-sager-dark-gray flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-bold tracking-wide">DRONE FLYING</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-sager-dark-gray rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex border-b border-sager-dark-gray flex-shrink-0">
        <button
          onClick={() => setActiveTab('drones')}
          className={`flex-1 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-colors relative ${
            activeTab === 'drones'
              ? 'text-white'
              : 'text-sager-lighter-gray hover:text-white'
          }`}
        >
          Drones
          {activeTab === 'drones' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sager-red"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-colors relative ${
            activeTab === 'history'
              ? 'text-white'
              : 'text-sager-lighter-gray hover:text-white'
          }`}
        >
          Flights History
          {activeTab === 'history' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sager-red"></div>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'drones' && (
          <div className="divide-y divide-sager-dark-gray">
            {sortedDrones.map(([serial, drone]) => {
              const authorized = canDroneFly(drone.registration);
              const isSelected = selectedDrone?.data.registration === drone.registration;
              
              return (
                <div
                  key={serial}
                  onClick={() => handleToggleTracking(drone, serial)}
                  className={`p-3 sm:p-4 transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-sager-dark-gray border-l-4 border-sager-light-gray shadow-lg' 
                      : 'hover:bg-sager-dark-gray'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className={"text-sm sm:text-base font-semibold truncate text-white"}>
                        {drone.name || 'Unknown Drone'}
                      </h3>
                      {isSelected && isTracking && (
                        <span className="inline-block mt-1 text-xs bg-sager-green text-sager-black px-2 py-0.5 rounded-full">
                          TRACKING
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 ml-2">
                      <button
                        onClick={() => handleToggleTracking(drone, serial)}
                        className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                          isSelected && isTracking
                            ? 'bg-sager-green text-sager-black'
                            : 'bg-sager-dark-gray hover:bg-gray-600 text-white'
                        }`}
                        title="Track this drone"
                      >
                        <Navigation size={12} className="sm:w-3.5 sm:h-3.5" />
                      </button>
                      
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0 ${
                          authorized ? 'bg-sager-green' : 'bg-sager-red'
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-sager-lighter-gray mb-0.5 sm:mb-1 text-xs">Serial #</p>
                      <p className="font-medium truncate">{serial}</p>
                    </div>
                    <div>
                      <p className="text-sager-lighter-gray mb-0.5 sm:mb-1 text-xs">Registration #</p>
                      <p className="font-medium truncate">{drone.registration || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sager-lighter-gray mb-0.5 sm:mb-1 text-xs">Pilot</p>
                      <p className="font-medium truncate">{drone.pilot || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sager-lighter-gray mb-0.5 sm:mb-1 text-xs">Organization</p>
                      <p className="font-medium truncate">{drone.organization || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-sager-dark-gray">
                    <div className="flex justify-between text-xs text-sager-lighter-gray">
                      <span>Status: {authorized ? 'Authorized' : 'Unauthorized'}</span>
                      <span>Alt: {drone.altitude ? `${drone.altitude}m` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-4 sm:p-6 text-center text-sager-lighter-gray">
            <p className="text-sm">Flight history will be displayed here</p>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3 border-t border-sager-dark-gray bg-sager-black flex-shrink-0">
        <p className="text-xs sm:text-sm text-sager-lighter-gray text-center">
          {drones.size} drone{drones.size !== 1 ? 's' : ''} active
        </p>
      </div>
    </div>
    );
};

export default DroneSidebar;
