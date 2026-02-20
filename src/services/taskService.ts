import { 
  collection, 
  addDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  Timestamp,
} from 'firebase/firestore';
import {db} from '../config/firebase'
import type{ TaskType } from '../types/task/taskType';
import type { TaskListItem } from '../types/task/taskListItemType';

export const TASKS_COLLECTION = 'tasks';

//create task function.
export const createTask = async (taskData: TaskType): Promise<string> => {
  const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
    ...taskData,
    createdAt: Timestamp.now(),
    updatedAt:Timestamp.now()
  });
  return docRef.id;
};

export const getTaskById = async (taskId: string|undefined): Promise<TaskListItem | null> => {
  if(!taskId)return null;
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  const snapshot = await getDoc(taskRef);

  if (!snapshot.exists()) {
    return null; // document not found
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as TaskListItem;
};

// Update a task
export const updateTask = async (taskId: string, updates: Partial<TaskType>): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(taskRef, {...updates
    ,updatedAt:Timestamp.now()
  });
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
};

