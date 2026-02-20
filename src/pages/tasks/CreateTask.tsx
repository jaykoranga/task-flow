import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { taskListLight, taskListDark } from "../../constants/themeConstants/taskListThemeConstants";
import FormInputComponent from "../../components/ui/FormInputComponent";
import FormSelectComponent from "../../components/ui/FormSelectComponent";
import {
  categoryOptionsArr,
  priorityOptionsArr,
} from "../../constants/formconstants/TaskFormConstants";
import { createTaskSchema } from "../../validation/taskValidation";
import { createTask } from "../../services/taskService";

const CreateTask = () => {
  const { theme } = useTheme();
  const t = theme === "dark" ? taskListDark : taskListLight;

  const [submitting, setSubmitting] = useState(false);
  const [clearing, setClearing] = useState(false);

  const navigate = useNavigate();

  const taskForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      priority: "",
      status: "",
      dueDate: "",
    },

    validationSchema: createTaskSchema,

    onSubmit: async (value, { resetForm }) => {
      try {
        setSubmitting(true);

        const finalValue = {
          ...value,
          isModified: false,
          updatedAt: null,
          status: "pending"
        };

        const result = await createTask(finalValue);

        if (result) {
          resetForm();
        }
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setSubmitting(false);
        navigate('/tasks')
      }
    },
    onReset: () => {

      setClearing(false);

    }
  });

  return (
    
    <div className={`min-h-screen p-6 ${t.page}`}>
      {/* Page Title */}
      <h2 className={`text-2xl mb-6 ${t.pageTitle}`}>
        Create New Task
      </h2>

      {/* Centered Card */}
      <div className="max-w-3xl mx-auto">
        <div className={`p-6 ${t.taskContainer}`}>

          <form
            onSubmit={taskForm.handleSubmit}
            onReset={taskForm.handleReset}
            className="flex flex-col gap-5"
          >
            {/* Title */}
            <FormInputComponent
              type="text"
              id="title"
              placeholder="Enter task title"
              taskForm={taskForm}
              display="Title"
            />

            {/* Description */}
            <FormInputComponent
              type="text"
              id="description"
              placeholder="Enter description"
              taskForm={taskForm}
              display="Description"
            />

            {/* Grid Layout for Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormSelectComponent
                name="Category"
                id="category"
                taskForm={taskForm}
                optionArr={categoryOptionsArr}
                showLabel={true}
              />

              <FormSelectComponent
                name="Priority"
                id="priority"
                taskForm={taskForm}
                optionArr={priorityOptionsArr}
                showLabel={true}
              />

            </div>
            {/* Due Date */}
            <FormInputComponent
              type="date"
              id="dueDate"
              placeholder="Enter Due Date"
              taskForm={taskForm}
              display="Due Date"
            />

            {/* Submit Button */}
            <div className="pt-4 flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className={`
                  w-full md:w-auto
                  px-6 py-2
                  rounded-md
                  text-sm font-medium
                  transition
                  ${t.filterBtnActive}
                  ${submitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {submitting ? "Creating..." : "Create Task"}
              </button>

              <button
                type='reset'
                disabled={submitting}
                className={`
                  w-full md:w-auto
                  px-6 py-2
                  rounded-md
                  text-sm font-medium
                  transition
                  ${t.filterBtnClearActive}
                  ${clearing ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
                `}
                onClick={() => { setClearing(true) }}
              >
                {clearing ? "clearing" : "Clear Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
