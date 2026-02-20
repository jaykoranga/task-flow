import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-(--main-bg)">
      
      {/* Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full  z-50 mr-0
          transform transition-transform duration-300 ease-in-out
          bg-(--sidebar-bg)
          
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          
          md:static md:translate-x-0 md:z-auto
        `}
      >
        <SideBar closeSidebar={closeSidebar} />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        <NavBar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-0 bg-(--main-bg)">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
