import { useTheme } from "../../context/ThemeContext";
import { taskListLight, taskListDark } from "../../constants/themeConstants/taskListThemeConstants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../Utility/ConfirmModal";
import { deleteTask } from "../../services/taskService";

interface TaskListComponentProps {
  name: string;
  category: string;
  status: string;
  priority: string;
  id: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TaskListComponent = ({
   name,
   category,
   status,
   priority,
   id,
   isSelected,
   onSelect,
  }: TaskListComponentProps) => {

  const { theme } = useTheme();
  const t = theme === "dark" ? taskListDark : taskListLight;
  const navigate = useNavigate();
  const [isdeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleEdit(id: string) {
    console.log("edit function called for id :", id);
    navigate(`/task/edit/${id}`);
  }

  function handleView(id: string) {
    console.log("view function called for id :", id);
    navigate(`/task/${id}`);
  }

  async function handleDelete(id: string) {
    console.log("delete function called for id :", id);
    await deleteTask(id);
    console.log("file deleted (id):", id);
    setIsDeleteModalOpen(false);
  }

  // Priority badge selector
  const getPriorityStyle = () => {
    switch (priority.toLowerCase()) {
      case "high":
        return t.badgeHigh;
      case "medium":
        return t.badgeMedium;
      case "low":
        return t.badgeLow;
      default:
        return t.categoryBadge;
    }
  };

  // Status badge selector
  const getStatusStyle = () => {
    switch (status.toLowerCase()) {
      case "pending":
        return t.badgePending;
      case "in progress":
        return t.badgeInProgress;
      case "completed":
        return t.badgeCompleted;
      default:
        return t.categoryBadge;
    }
  };

  return (
    <>
      {isdeleteModalOpen && (
        <ConfirmModal
          isOpen={isdeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onConfirm={() => {
            handleDelete(id);
          }}
        />
      )}

      <tr className={t.tableRow}>

        <td className="px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(id)}
            className={`rounded ${t.checkbox}`}
          />
        </td>

        <td className={`px-4 py-3 ${t.tableCell}`}>
          <div className="font-medium">{name}</div>
        </td>

        <td className={`px-4 py-3 ${t.tableCell}`}>{category}</td>

        <td className="px-4 py-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}
          >
            {status}
          </span>
        </td>

        <td className="px-4 py-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle()}`}
          >
            {priority}
          </span>
        </td>

        <td className="px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleView(id)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${t.btnView}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </button>
            <button
              onClick={() => handleEdit(id)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${t.btnEdit}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${t.btnDelete}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </td>

      </tr>
    </>
  );
};

export default TaskListComponent;