import { useMemo } from 'react';
import { Task, FilterOptions } from '../types/Task';

export const useTaskFilters = (tasks: Task[], searchQuery: string, filterOptions: FilterOptions) => {
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Priority filter
    if (filterOptions.priority) {
      filtered = filtered.filter(task => task.priority === filterOptions.priority);
    }

    // Completion status filter
    if (filterOptions.completed !== null) {
      filtered = filtered.filter(task => task.completed === filterOptions.completed);
    }

    // Sort tasks
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (filterOptions.sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (filterOptions.sortBy === 'dueDate') {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        comparison = dateA.getTime() - dateB.getTime();
      } else if (filterOptions.sortBy === 'createdAt') {
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
      }

      return filterOptions.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [tasks, searchQuery, filterOptions]);

  return filteredTasks;
};