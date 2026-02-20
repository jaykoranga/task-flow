const HydrateFallback = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Data is being loaded
        </h2>
        
        <p className="text-sm sm:text-base text-gray-500">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default HydrateFallback;
