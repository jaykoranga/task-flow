import { IdCard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { dashboardDark,dashboardLight } from '../../constants/themeConstants/dashboardConstants';
import type{ CardData } from '../../types/dashboard/dashboardCardType';

const DashboardCard = ({
   label = "Demo Label",
   value = 10,
 
  }:CardData) => {
  
  const { theme } = useTheme();
  const t = theme === "dark" ? dashboardDark : dashboardLight;

  return (
    <div
      className={`
        flex flex-col items-center justify-between
        w-52 p-6 rounded-xl
        transition-all duration-300
        ${t.card}
      `}
    >
      {/* Icon */}
      <div
        className={`
          flex items-center justify-center
          w-12 h-12 rounded-lg
          ${t.iconWrapper}
        `}
      >
     <IdCard/>
      </div>

      {/* Label */}
      <span className={t.label}>
        {label}
      </span>

      {/* Value */}
      <span className={t.value}>
        {value}
      </span>
    </div>
  );
};

export default DashboardCard;