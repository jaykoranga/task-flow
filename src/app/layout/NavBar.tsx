import { Moon, Sun ,Menu} from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { navLight, navDark } from "../../constants/themeConstants/navbarConstants"

interface NavBarProps{
  toggleSidebar:()=>void
}
const NavBar = ({toggleSidebar}:NavBarProps) => {
  const { theme, toggleTheme } = useTheme()
  const t = theme === "dark" ? navDark : navLight

  return (
    <nav className={`flex items-center justify-between px-6 py-3 sticky top-0 z-10 ${t.nav}`}>

      <div className="flex items-center gap-3">
         <button onClick={toggleSidebar}>
          <Menu size={18} className="md:hidden"></Menu>
         </button>
        <div className="flex flex-col">
         
          <h1 className={`text-xl font-bold tracking-tight leading-none ${t.brand}`}>
            Task<span className={t.brandAccent}>Flow</span>
          </h1>
          <span className={t.tagline}>Management Application</span>
        </div>

      </div>

      <button
        onClick={toggleTheme}
        className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${t.btn}`}
      >
        <span className={`transition-colors duration-200 ${t.btnIcon}`}>
          {theme === "dark" ?   <Moon size={15} />:<Sun size={15} />}
        </span>
        {theme === "dark" ? "Dark Mode":"Light Mode"}
      </button>

    </nav>
  )
}

export default NavBar