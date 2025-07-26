import { useState, useEffect } from 'react';
import { Task, FilterOptions } from '../types/Task';
import { TaskService } from '../service/TaskService';

export const useTasks = (userId: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const taskService = new TaskService();

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const unsubscribe = taskService.subscribeToTasks(userId, (tasksData) => {
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      await taskService.addTask(taskData);
      return true;
    } catch (error) {
      console.error('Error adding task:', error);
      return false;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await taskService.updateTask(taskId, updates);
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };
};