export const lightModalTheme = {
  overlay:
    "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50",

  modal:
    "w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative transition-all duration-300",

  title: "text-xl font-semibold text-blue-600",

  message: "text-gray-600 mt-2",

  closeButton:
    "absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors",

  cancelButton:
    "px-4 py-2 rounded-xl font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all",

  confirmButton:
    "px-4 py-2 rounded-xl font-medium bg-orange-500 hover:bg-orange-600 text-white transition-all",
};

export const darkModalTheme = {
  overlay:
    "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50",

  modal:
    "w-full max-w-md bg-[#1e293b] rounded-2xl shadow-2xl p-6 relative transition-all duration-300",

  title: "text-xl font-semibold text-blue-400",

  message: "text-gray-300 mt-2",

  closeButton:
    "absolute top-4 right-4 text-gray-500 hover:text-gray-200 transition-colors",

  cancelButton:
    "px-4 py-2 rounded-xl font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all",

  confirmButton:
    "px-4 py-2 rounded-xl font-medium bg-orange-600 hover:bg-orange-700 text-white transition-all",
};
