interface FilterSelectProps {
  options:string[];
  value:string;
  onChange: (value: string) => void;
  
  theme:
  {
    select: string;
    selectIcon: string;
  };

  placeholder?: string;
}

const FilterSelect = ({
  options,
  value,
  onChange,
  theme,
  placeholder = "Select...",
}: FilterSelectProps) => {
  
  return (
    
    <div className="relative">
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 pr-8 rounded-md text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 ${theme.select}`}> 
        
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${theme.selectIcon}`}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default FilterSelect;