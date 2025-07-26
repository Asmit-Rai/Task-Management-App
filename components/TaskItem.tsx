// components/TaskItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#FF5252';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLongPress = () => {
    Alert.alert(
      'Task Options',
      'What would you like to do?',
      [
        { text: 'Edit', onPress: () => onEdit(task) },
        { 
          text: 'Delete', 
          onPress: () => onDelete(task.id), 
          style: 'destructive' 
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.taskItem, task.completed && styles.completedTask]}
      onPress={() => onToggleComplete(task)}
      onLongPress={handleLongPress}
    >
      <View style={styles.taskContent}>
        <View style={[styles.checkbox, task.completed && styles.checkedBox]} />
        
        <View style={styles.taskDetails}>
          <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          
          {task.description ? (
            <Text style={[styles.taskDescription, task.completed && styles.completedText]}>
              {task.description}
            </Text>
          ) : null}
          
          <Text style={styles.taskMeta}>
            Due: {formatDate(task.dueDate)}
          </Text>
        </View>
        
        <View style={[styles.priorityTag, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  completedTask: {
    opacity: 0.6,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#878AF5',
    marginRight: 16,
  },
  checkedBox: {
    backgroundColor: '#878AF5',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
  },
  taskMeta: {
    fontSize: 12,
    color: '#718096',
  },
  priorityTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TaskItem;
