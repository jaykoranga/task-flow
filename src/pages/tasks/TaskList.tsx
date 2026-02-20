import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, where,QueryConstraint } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { TaskListItem } from "../../types/task/taskListItemType";
import { TASKS_COLLECTION, updateTask } from "../../services/taskService";
import TaskListComponent from "../../components/ui/TaskListComponent";
import { useTheme } from "../../context/ThemeContext";
import { taskListLight, taskListDark } from "../../constants/themeConstants/taskListThemeConstants";
import FilterSelect from "../../components/ui/FilterSelect";
import { categoryOptionsArr,priorityOptionsArr,statusOptionsArr } from "../../constants/formconstants/TaskFormConstants";
import { useNavigate } from "react-router-dom";
import { useDebouncer } from "../../hooks/useDebouncer";

const TaskList = () => {
  const { theme } = useTheme();
  const t = theme === "dark" ? taskListDark : taskListLight;
  const navigate=useNavigate()

  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [displayTasks, setDisplayTasks] = useState<TaskListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
 

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

 
  const categoryOptions = categoryOptionsArr.map((category)=>category.value)
  const priorityOptions = priorityOptionsArr.map((category)=>category.value)
  const statusOptions = statusOptionsArr.map((category)=>category.value)
  
  let debouncedSearch=useDebouncer<string>(searchQuery,600);

 useEffect(() => {
  const constraints: QueryConstraint[] = [];

  if (categoryFilter) constraints.push(where("category", "==", categoryFilter));
  if (priorityFilter)  constraints.push(where("priority", "==", priorityFilter));
  if (statusFilter)    constraints.push(where("status", "==", statusFilter));

  const hasFilters = constraints.length > 0;

  const q = hasFilters
    ? query(collection(db, TASKS_COLLECTION), ...constraints)
    : query(collection(db, TASKS_COLLECTION), orderBy("updatedAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    let tasksData: TaskListItem[] = [];

    snapshot.forEach((s) => {
      tasksData.push({ id: s.id, ...s.data() } as TaskListItem);
    });

  
    if (hasFilters) {
      tasksData.sort((a, b) =>{
        if(!a.updatedAt || !b.updatedAt) return 0;
        return (b.updatedAt.seconds) - (a.updatedAt.seconds)
      }
      );
    }

    setTasks(tasksData);
    setDisplayTasks(tasksData)
    setSelectedTasks(()=>{
      return (tasksData.map((t)=>{
        if(t.status==="completed"){
          return t.id;
        }
      }))as string []
    })
    setLoading(false);
  });

  return () => unsubscribe();

}, [categoryFilter, priorityFilter, statusFilter]);
  

  const handleSelectTask = async(taskId: string) => {
    if(selectedTasks?.includes(taskId)) {
        try {
          const selectedTask=displayTasks.find((e)=>e.id===taskId)
          if(selectedTask)selectedTask.status="pending"
          await updateTask(taskId,selectedTask as TaskListItem)
          setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
        } catch (error) {
          console.error(error)
        }
      

    } else {
       try {
          const selectedTask=displayTasks.find(t=>t.id===taskId)
          if(selectedTask)selectedTask.status='completed'
          await updateTask(taskId,selectedTask as TaskListItem)
          setSelectedTasks([...selectedTasks, taskId]);
        } catch (error) {
          console.error(error)
        }
     

    }
  };

  
  const handleSearch = () => {
    console.log("Search:", searchQuery);
    if(tasks && debouncedSearch){
      setSearchQuery((prev)=>prev.toLowerCase());
      const result =tasks.filter((t)=>{
        return (t.title.includes(debouncedSearch))
      })
      setDisplayTasks(result);

    }
    if(!debouncedSearch){
       setDisplayTasks(tasks);
    }
  };
  useEffect(()=>{
     handleSearch()
  },[debouncedSearch])

  

  return (
    
    <div className={`min-h-screen p-6 ${t.page}`}>
      {/* Page Header */}
      <div className={`mb-6 p-4 flex items-center justify-between ${t.pageHeader}`}>
        <h2 className={`text-2xl ${t.pageTitle}`}>All Tasks</h2>
        <button
          onClick={()=>{ navigate('/task/create')}}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t.filterBtnActive}`}
        >
          Create Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`mb-6 p-4 ${t.filterBar}`}>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search */}
          <div className="flex-1 min-w-200px">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${t.searchIcon}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) =>{ setSearchQuery(e.target.value)
                    
                   
                  }}
                  className={`w-full pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${t.searchInput}`}
                />
              </div>
              {/* <button
                onClick={handleSearch}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${t.searchBtn}`}
              >
                Search
              </button> */}
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-40">
            <FilterSelect
              options={categoryOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
              theme={{ select: t.select, selectIcon: t.selectIcon }}
              placeholder="All Categories"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-40">
            <FilterSelect
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              theme={{ select: t.select, selectIcon: t.selectIcon }}
              placeholder="All Statuses"
            />
          </div>

          {/* Priority Filter */}
          <div className="w-full sm:w-40">
            <FilterSelect
              options={priorityOptions}
              value={priorityFilter}
              onChange={setPriorityFilter}
              theme={{ select: t.select, selectIcon: t.selectIcon }}
              placeholder="All Priorities"
            />
          </div>

          {/* Filter Button */}
          <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${t.filterBtnActive}${categoryFilter?'':statusFilter?'':priorityFilter?'':`disable cursor-not-allowed ${t.filterBtnUnActive} `}`} onClick={()=>{
            setStatusFilter("")
            setCategoryFilter("")
            setPriorityFilter("")
          }}>
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className={`overflow-x-auto ${t.taskContainer}`}>
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div
              className={`w-8 h-8 border-4 rounded-full animate-spin ${t.loadingSpinner}`}
            />
          </div>
        ) : tasks.length === 0 ? (
          <div className={`flex flex-col items-center p-12 ${t.emptyState}`}>
            <svg
              className={`w-16 h-16 mb-4 ${t.emptyStateIcon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-lg">No tasks found</p>
          </div>
        ) : (
          <table className={`w-full ${t.table}`}>
            <thead className={t.tableHeader}>
              <tr>
                <th className="px-4 py-3 text-left w-12">
                </th>
                <th className={`px-4 py-3 text-left ${t.tableHeaderCell}`}>
                  Task
                  <svg
                    className="inline-block w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </th>
                <th className={`px-4 py-3 text-left ${t.tableHeaderCell}`}>
                  Category
                </th>
                <th className={`px-4 py-3 text-left ${t.tableHeaderCell}`}>
                  Status
                  <svg
                    className="inline-block w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </th>
                <th className={`px-4 py-3 text-left ${t.tableHeaderCell}`}>
                  Priority
                </th>
                <th className={`px-4 py-3 text-center ${t.tableHeaderCell}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayTasks.map((task) => (
                <TaskListComponent
                  key={task.id}
                  id={task.id}
                  name={task.title}
                  category={task.category}
                  status={task.status}
                  priority={task.priority}
                  isSelected={selectedTasks.includes(task.id)}
                  onSelect={handleSelectTask}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
  );
};

export default TaskList;