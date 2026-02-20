import { lightTheme, darkTheme } from "../../constants/themeConstants/viewThemeConstants";
import { useTheme } from "../../context/ThemeContext";
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router-dom";
import type { TaskListItem } from "../../types/task/taskListItemType";
import { deleteTask, getTaskById } from "../../services/taskService";
import { useState } from "react";
import ConfirmModal from "../../components/Utility/ConfirmModal";

export async function viewTaskLoaderFunction({ params }: LoaderFunctionArgs): Promise<TaskListItem | null> {
    const { id } = params
    const result = await getTaskById(id);
    if (!result){
        return null
    }
    return result as TaskListItem;
}

const View = () =>
{
  const { theme } = useTheme(); // "light" | "dark"
  const styles = theme === "dark" ? darkTheme : lightTheme;
  const {title,description,status,category,priority,dueDate,updatedAt,isModified,id} =useLoaderData();
  const navigate =useNavigate()
  const [isdeleteModalOpen,setIsDeleteModalOpen]=useState(false)
  async function handleDelete(id:string){
    console.log("delete function called for id :",id)
   try {
    await deleteTask(id)
    console.log("file deleted (id):",id)
   } catch (error) {
      console.error("delete operation could not be fired .")
   }
   finally{
    navigate('/tasks')
   }
    
 }

  return (
    
    <div className={`min-h-screen p-6 ${styles.container}`}>
      { isdeleteModalOpen && <ConfirmModal isOpen={isdeleteModalOpen} onClose={()=>setIsDeleteModalOpen(false)} onConfirm={()=>handleDelete(id)}/>}  
      <div
        className={`max-w-2xl mx-auto rounded-2xl p-8 space-y-6 ${styles.card}`}
      >
        {/* Title */}
        <h1 className={`text-3xl font-bold ${styles.heading}`}>
          {title}
        </h1>

        {/* Description */}
        <div>
          <p className={`text-sm ${styles.label}`}>Description</p>
          <p className={`mt-1 ${styles.value}`}>{description}</p>
        </div>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-sm ${styles.label}`}>Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${styles.badge.status}`}
            >
              {status}
            </span>
          </div>

          <div>
            <p className={`text-sm ${styles.label}`}>Category</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${styles.badge.category}`}
            >
              {category}
            </span>
          </div>

          <div>
            <p className={`text-sm ${styles.label}`}>Priority</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${styles.badge.priority}`}
            >
              {priority}
            </span>
          </div>

          <div>
            <p className={`text-sm ${styles.label}`}>Due Date</p>
            <p className={`mt-1 ${styles.value}`}>{dueDate}</p>
          </div>
        </div>

        {/* Modified Info */}
        <div>
          <p className={`text-sm ${styles.label}`}>Last Updated</p>
          <p className={`mt-1 ${styles.value}`}>
            {isModified && updatedAt
              ? updatedAt.toLocaleString()
              : "Not modified yet"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            className={`px-5 py-2 rounded-xl font-semibold ${styles.buttonPrimary}`}
            onClick={()=>{
                 navigate(`/task/edit/${id}`)
            }}
          >
            Edit
          </button>

          <button
            className={`px-5 py-2 rounded-xl font-semibold ${styles.buttonDanger}`}
            onClick={()=>{setIsDeleteModalOpen(true)}}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
