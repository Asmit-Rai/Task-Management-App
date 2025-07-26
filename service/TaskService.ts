import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Task } from '../types/Task';

export class TaskService {
  private collectionName = 'tasks';

  subscribeToTasks(userId: string, callback: (tasks: Task[]) => void) {
    const q = query(
      collection(db, this.collectionName),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasks.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate,
          completed: data.completed,
          userId: data.userId,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });
      callback(tasks);
    });
  }

  async addTask(taskData: Omit<Task, 'id'>) {
    await addDoc(collection(db, this.collectionName), {
      ...taskData,
      createdAt: Timestamp.fromDate(taskData.createdAt),
    });
  }

  async updateTask(taskId: string, updates: Partial<Task>) {
    const taskRef = doc(db, this.collectionName, taskId);
    await updateDoc(taskRef, updates);
  }

  async deleteTask(taskId: string) {
    const taskRef = doc(db, this.collectionName, taskId);
    await deleteDoc(taskRef);
  }
}