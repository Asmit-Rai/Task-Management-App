export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // ISO date string
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export type Priority = 'High' | 'Medium' | 'Low';

export interface FilterOptions {
  priority: Priority | null;
  completed: boolean | null;
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}