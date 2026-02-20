import { LayoutDashboard, ClipboardList, SquarePen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { lightTheme, darkTheme } from '../../constants/themeConstants/sideBarConstants';

interface NavlinksType {
  to: string;
  icon: React.ReactNode;
  label: string;
}
type SidebarProps = {
  closeSidebar: () => void;
};

const SideBar = ({closeSidebar}:SidebarProps) => {
  const { theme } = useTheme();
  const t = theme === 'dark' ? darkTheme : lightTheme;

  const navLinks: NavlinksType[] = [
    { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/tasks',     icon: <ClipboardList size={18} />,   label: 'Tasks'     },
    { to: '/task/create', icon: <SquarePen size={18} />,     label: 'Create Task'},
  ];

  return (
    <aside className={`flex flex-col w-60 h-screen px-3 py-6 gap-2 ${t.sidebar}`}>

      <div className="flex items-center gap-2 px-3 pb-2">
       
        <span className={`text-lg tracking-tight ${t.brandName}`}>
          Task<span className="text-orange-500">Flow</span>
        </span>
      </div>

      {/* <hr className={t.divider} /> */}

      <p className={`text-[11px] uppercase tracking-widest px-3 pt-2 ${t.menuLabel}`}>
        Menu
      </p>

      <ul className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <li key={link.to}  onClick={closeSidebar}>
            <NavLink
              to={link.to}
              className={({ isActive,isPending }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                ${(isActive )? t.navLinkActive :`${isPending ?`bg-slate-400  animate-pulse`:t.navLink}` }`
              }
             
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? t.navIconActive : t.navIcon}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

    </aside>
  );
};

export default SideBar;