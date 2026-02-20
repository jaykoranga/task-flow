import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import CreateTask from "../pages/tasks/CreateTask"
import TaskList from "../pages/tasks/TaskList"
import EditTask, { editTaskLoaderFunction } from "../pages/tasks/EditTask"
import View, { viewTaskLoaderFunction } from "../pages/tasks/View"
import HydrateFallback from "../components/Utility/HydrateFallback"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        
      },

      {
        path: 'tasks',
        element: <TaskList />,

      },
      {
        path: 'task/edit/:id',
        element: <EditTask />,
        hydrateFallbackElement:<HydrateFallback/>,
        loader:editTaskLoaderFunction
      },

      {
        path: 'task/:id',
        element: <View/>,
        hydrateFallbackElement:<HydrateFallback/>,
        loader:viewTaskLoaderFunction
      },



      {
        path: 'task/create',
        element: <CreateTask />
      },


    ]
  },

  {
    path: '*',
    element: <></>
  }
])
const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes
