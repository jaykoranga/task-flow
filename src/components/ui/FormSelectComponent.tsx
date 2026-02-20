import type { FormikProps } from "formik";
import { useTheme } from "../../context/ThemeContext";
import { formLight, formDark } from "../../constants/themeConstants/formThemeConstants";

type optionArrType = {
  value: string;
  label: string;
};

interface FormSelectComponentProps {
  name: string;
  id: string;
  taskForm: FormikProps<any>;
  optionArr: optionArrType[];
  showLabel?: boolean;
  required?: boolean;
}

const FormSelectComponent = ({
   name,
   id,
   taskForm,
   optionArr,
   showLabel = true,
   required = false,
  }: FormSelectComponentProps) => 

{
  const { theme } = useTheme();
  const t = theme === "dark" ? formDark : formLight;
  const hasError = taskForm.touched[id] && taskForm.errors[id];

  return (
    <div className={t.wrapper}>

      {/* Label */}
      {showLabel && (
        <label htmlFor={id} className={t.label}>
          {name}
          {required && <span className={`ml-1 ${t.required}`}>*</span>}
        </label>
      )}

      {/* Select */}
      <select
        name={id}
        id={id}
        onChange={taskForm.handleChange}
        onBlur={taskForm.handleBlur}
        value={taskForm.values[id]}
        className={`${t.input} cursor-pointer ${hasError ? t.inputError : ""
          }`}
        >

        <option value="" disabled>
          Select {name}
        </option>

        {optionArr.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error */}
      {hasError && (
        <p className={t.errorText}>
          {`${taskForm.errors[id]}`}
        </p>
      )}

    </div>
  );
};
export default FormSelectComponent;
