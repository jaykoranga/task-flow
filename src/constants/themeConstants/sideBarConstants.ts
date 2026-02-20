export const lightTheme = {
  // Layout
  sidebar: "bg-white border-r border-gray-200 shadow-sm",
  mainBg: "bg-gray-50",
  navbar: "bg-white border-b border-gray-200 shadow-sm",

  // Typography
  brandName: "text-gray-900 font-bold",
  menuLabel: "text-gray-400",
  divider: "border-gray-200",

  // Nav links
  navLink: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  navLinkActive: "bg-orange-50 text-orange-600 border-l-2 border-orange-500 font-semibold",
  navIcon: "text-gray-400",
  navIconActive: "text-orange-500",

  // Navbar
  navbarTitle: "text-gray-900",
  navbarBtn: "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-orange-50 hover:text-orange-500",

  // Cards / Panels (for pages)
  card: "bg-white border border-gray-200 shadow-sm",
  cardTitle: "text-gray-900 font-semibold",
  cardText: "text-gray-500",

  // Inputs
  input: "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400",
  label: "text-gray-700 font-medium",

  // Buttons
  btnPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
  btnSecondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  btnDanger: "bg-red-50 hover:bg-red-100 text-red-600",

  // Badges / Tags
  badge: "bg-orange-100 text-orange-600",
  badgeGray: "bg-gray-100 text-gray-500",
}

export const darkTheme = {
  // Layout
  sidebar: "bg-slate-800 border-r border-slate-700 shadow-md",
  mainBg: "bg-slate-900",
  navbar: "bg-slate-800 border-b border-slate-700 shadow-md",

  // Typography
  brandName: "text-slate-100 font-bold",
  menuLabel: "text-slate-500",
  divider: "border-slate-700",

  // Nav links
  navLink: "text-slate-400 hover:bg-slate-700 hover:text-slate-100",
  navLinkActive: "bg-slate-900 text-orange-400 border-l-2 border-orange-400 font-semibold",
  navIcon: "text-slate-500",
  navIconActive: "text-orange-400",

  // Navbar
  navbarTitle: "text-slate-100",
  navbarBtn: "bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-900 hover:text-orange-400",

  // Cards / Panels (for pages)
  card: "bg-slate-800 border border-slate-700 shadow-md",
  cardTitle: "text-slate-100 font-semibold",
  cardText: "text-slate-400",

  // Inputs
  input: "bg-slate-900 border border-slate-600 text-slate-100 placeholder-slate-500 focus:border-orange-400 focus:ring-orange-400",
  label: "text-slate-300 font-medium",

  // Buttons
  btnPrimary: "bg-orange-500 hover:bg-orange-400 text-white",
  btnSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
  btnDanger: "bg-red-900/40 hover:bg-red-900/60 text-red-400",

  // Badges / Tags
  badge: "bg-orange-900/40 text-orange-400",
  badgeGray: "bg-slate-700 text-slate-400",
}

export type AppTheme = typeof lightTheme