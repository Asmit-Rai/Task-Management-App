export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isOverdue = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const isDueToday = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  return today.toDateString() === due.toDateString();
};