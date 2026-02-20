import { useFormik } from "formik";
import { useLoaderData, useNavigate } from "react-router-dom"
import { updateTask } from "../../services/taskService";
import { getTaskById } from "../../services/taskService";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { TaskListItem } from "../../types/task/taskListItemType";
import { useTheme } from "../../context/ThemeContext";
import { taskListDark, taskListLight } from "../../constants/themeConstants/taskListThemeConstants";
import FormInputComponent from "../../components/ui/FormInputComponent";
import FormSelectComponent from "../../components/ui/FormSelectComponent";
import { categoryOptionsArr, priorityOptionsArr, statusOptionsArr } from "../../constants/formconstants/TaskFormConstants";
import { useState } from "react";
import { createTaskSchema } from "../../validation/taskValidation";


export async function editTaskLoaderFunction({ params }: LoaderFunctionArgs): Promise<TaskListItem | null> {
    const { id } = params
    const result = await getTaskById(id);

    if (!result) {
        return null
    }

    return result as TaskListItem;
}

const EditTask = () => {
    const { theme } = useTheme();
    const t = theme === "dark" ? taskListDark : taskListLight;
    const [submitting, setSubmitting] = useState(false);
    const [clearing, setClearing] = useState(false);

    const task: TaskListItem = useLoaderData() //fetches the task from the the Db via loader function.

    const navigate = useNavigate();

    console.log("the  editable document is :", task);//test

    //formik form that controle all form operations
    const taskForm = useFormik({

        initialValues: {
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate,
        },

        validationSchema: createTaskSchema,
        onSubmit: async (value) => {
            setSubmitting(true)
            try {
                await updateTask(task.id, value)
            } catch (err) {

            }
            finally {
                setSubmitting(false);
                navigate('/tasks')
            }




        },
        onReset: () => {
            setClearing(false)
        }
    })

    return (
        <div className={`min-h-screen p-6 ${t.page}`}>
            {/* Page Title */}
            <h2 className={`text-2xl mb-6 ${t.pageTitle}`}>
                Edit the Task
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

                            <FormSelectComponent
                                name="Status"
                                id="status"
                                taskForm={taskForm}
                                optionArr={statusOptionsArr}
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
                                {submitting ? "editing..." : "Edit Task"}
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
                                {clearing ? "doing undo" : "Undo Edit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask
