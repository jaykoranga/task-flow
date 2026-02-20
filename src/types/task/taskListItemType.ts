import type { Timestamp } from "firebase/firestore"
export interface TaskListItem {
  id: string,
  title: string,
  description: string,
  status: string,
  category: string,
  priority: string,
  isModified: boolean,
  dueDate: string
  updatedAt: Timestamp|null
}