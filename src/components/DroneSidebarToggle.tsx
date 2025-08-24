const DroneSidebarToggle = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors text-sm font-medium"
    >
      Show Drones
    </button>
  );
};

export default DroneSidebarToggle;
