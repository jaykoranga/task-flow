import type { FormikProps } from "formik";
import { useTheme } from "../../context/ThemeContext";
import { formLight, formDark } from "../../constants/themeConstants/formThemeConstants";

interface FormInputComponentProps {
  type: string;
  id: string;
  placeholder?: string;
  taskForm: FormikProps<any>;
  display: string;
  required?: boolean;
}

const FormInputComponent = ({
  type,
  id,
  placeholder = "",
  taskForm,
  display,
  required = false,
}: FormInputComponentProps) => {
  const { theme } = useTheme();
  const t = theme === "dark" ? formDark : formLight;
  const hasError = taskForm.touched[id] && taskForm.errors[id];

  return (
    <div className={t.wrapper}>
      {/* Label */}
      <label htmlFor={id} className={t.label}>
        {display}
        {required && <span className={`ml-1 ${t.required}`}>*</span>}
      </label>

      {/* Input */}
      <input
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={taskForm.handleChange}
        onBlur={taskForm.handleBlur}
        value={taskForm.values[id]}
        className={`${t.input} ${hasError ? t.inputError : ""}`}
      />

      {/* Error Text */}
      {hasError && (
        <p className={t.errorText}>
          {`${taskForm.errors[id]}`}
        </p>
      )}
    </div>
  );
};

export default FormInputComponent;
