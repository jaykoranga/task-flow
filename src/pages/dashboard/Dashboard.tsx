import DashboardCard from "../../components/Utility/DashboardCard"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { TASKS_COLLECTION } from "../../services/taskService"
import { db } from "../../config/firebase"
import type { TaskListItem } from "../../types/task/taskListItemType"
import { Chart } from "react-google-charts";
import { dashboardDark, dashboardLight } from "../../constants/themeConstants/dashboardConstants"
import { useTheme } from "../../context/ThemeContext"

const Dashboard = () => {
  const { theme } = useTheme();
  const t = theme === "dark" ? dashboardDark : dashboardLight;

  const [taskStatus, setTaskStatus] = useState({ pending: 0, completed: 0, total: 0 })
  const [allTasks, setAllTasks] = useState<TaskListItem[]>([])
  const [recentTasks, setRecentTasks] = useState<TaskListItem[]>([])

  const [chartData, setChartData] = useState<(string | number)[][]>([
    ["Task", "Count"],
    ["Pending", 0],
    ["Completed", 0],
  ]);

  const chartOptions = {
    title: "Task Overview",
    backgroundColor: "transparent",
    titleTextStyle: {
      color: theme === "dark" ? "#f97316" : "#ea580c",
      fontSize: 16,
      bold: true,
    },
    slices: {
      0: { color: "#f97316" }, // Pending - orange
      1: { color: "#3b82f6" }, // Completed - blue
    },
    legend: {
      textStyle: { color: theme === "dark" ? "#d1d5db" : "#374151" },
    },
    pieHole: 0.4, // donut style
  };

  useEffect(() => {
    const q = query(
      collection(db, TASKS_COLLECTION),
      orderBy("updatedAt", "desc"),
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let tasksData: TaskListItem[] = [];
      snapshot.forEach((s) => {
        tasksData.push({ id: s.id, ...s.data() } as TaskListItem);
      })

      setAllTasks(tasksData);
      setRecentTasks(tasksData.slice(0, 3)); // recent 3

      const pendingTasks = tasksData.filter((t) => t.status === "pending").length
      const totalTasks = tasksData.length
      const completedTasks = tasksData.filter((t) => t.status === "completed").length;

      setTaskStatus({ pending: pendingTasks, completed: completedTasks, total: totalTasks })

      setChartData([
        ["Task", "Count"],
        ["Pending", pendingTasks],
        ["Completed", completedTasks],
      ]);
    })
    return unsubscribe
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return t.badgePending;
      case "completed": return t.badgeCompleted;
      case "in progress": return t.badgeInProgress;
      default: return t.badgePending;
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return t.dotHigh;
      case "medium": return t.dotMedium;
      case "low": return t.dotLow;
      default: return t.dotLow;
    }
  };

  return (
    <div className={`${t.page} p-4 md:p-6 flex flex-col `}>

      {/* Header */}
      <h2 className={`${t.pageTitle} mb-6`}>Dashboard</h2>

      {/* Stats Cards */}
      <div className="flex md:flex-row justify-around items-center flex-col gap-4 mb-6 ">
        {Object.entries(taskStatus).map((e, i) => (
          <DashboardCard key={`${i}`} label={e[0]} value={e[1]} />
        ))}
      </div>

      {/* Chart + Recent Tasks side by side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Pie Chart */}
        <div className={t.chartCard}>
          <h3 className={`${t.sectionTitle} mb-2`}>Task Overview</h3>
          {allTasks.length > 0 ? (
            <Chart
              chartType="PieChart"
              data={chartData}
              options={chartOptions}
              width="100%"
              height="300px"
            />
          ) : (
            <div className="flex items-center justify-center h-75">
              <p className={t.emptyText}>No data yet</p>
            </div>
          )}
        </div>

        {/* Recent Tasks */}
        <div className={t.recentCard}>
          <h3 className={`${t.sectionTitle} mb-3`}>Recent Tasks</h3>

          {recentTasks.length === 0 ? (
            <div className="flex items-center justify-center h-75">
              <p className={t.emptyText}>No tasks yet</p>
            </div>
          ) : (
            <div>
              {recentTasks.map((task) => (
                <div key={task.id} className={t.recentItem}>
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Priority dot */}
                    <span className={`w-2 h-2 rounded-full shrink-0 ${getPriorityDot(task.priority)}`} />
                    <div className="min-w-0">
                      <p className={`${t.recentTaskName} truncate`}>{task.title}</p>
                      <p className={t.recentTaskMeta}>{task.category} · {task.priority}</p>
                    </div>
                  </div>
                  {/* Status badge */}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ml-2 ${getStatusBadge(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard