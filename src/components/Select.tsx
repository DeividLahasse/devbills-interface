
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  options: SelectOption[];
}

export const Select = ({ label, error, options, icon, fullWidth = true, className = "", id, ...rest }: SelectProps) => {
  const selectId = useId();
  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
      {label && <label className="block text-sm font-medium text-gray-50 mb-2" htmlFor={selectId}>{label}</label>}

      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400´ pointer-events-none">{icon}</div>}

      <select
  id={selectId}
  className={`${icon ? "pl-8" : "pl-3"} ${error ? "border-red-500": "border-gray-700"}py-1.5 pr-2 bg-gray-800 h-8 border border-gray-700 rounded-md text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 outline-none ${className}`}
  {...rest} 
>
  {options.map((option) => (
    <option key={option.value} value={option.value} className="bg-gray-800 text-gray-100">
      {option.label}
    </option>
  ))}
</select>


{/* <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
    <ChevronDown className="h-5 w-5 text-gray-50" />
</div> */}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;