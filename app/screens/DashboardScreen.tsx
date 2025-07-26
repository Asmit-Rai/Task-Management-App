import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Task, FilterOptions } from "../../types/Task";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import AddButton from "@/components/AddButton";
import EmptyState from "@/components/EmptyState";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks(
    user?.uid || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priority: null,
    completed: null,
    sortBy: "dueDate",
    sortOrder: "asc",
  });

  const filteredTasks = useTaskFilters(tasks, searchQuery, filterOptions);

  const handleAddTask = async (taskData: any) => {
    if (!user) return false;
    return await addTask({
      ...taskData,
      userId: user.uid,
      completed: false,
      createdAt: new Date(),
    });
  };

  const getRandomEmptyTaskMessage = () => {
    const messages = [
      "Nothing to do... suspiciously peaceful.",
      "All clear! Go take a nap. 😴",
      "Your task list is emptier than my bank account.",
      "No tasks? Must be a glitch in the matrix.",
      "Task list: 0. You: 1.",
      "You’ve out-tasked yourself. 🏆",
      "Looks like it’s snack time again.",
      "Free time unlocked! Don’t waste it... or do.",
      "Your future self is dancing with joy right now!",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleUpdateTask = async (taskId: string, updates: any) => {
    return await updateTask(taskId, updates);
  };

  const handleDeleteTask = async (taskId: any) => {
    return await deleteTask(taskId);
  };

  const handleToggleComplete = (task: any) => {
    handleUpdateTask(task.id, { completed: !task.completed });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState message="Loading your tasks.." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#878AF5" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0
        }
      >
        <Header
          onFilterPress={() => setShowFilterDropdown(true)}
          onLogout={logout}
        />

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tasks..."
        />

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#878AF5"]}
              tintColor="#878AF5"
            />
          }
        >
          {filteredTasks.length === 0 ? (
            <EmptyState
              message={
                searchQuery
                  ? "No tasks found matching your search"
                  : getRandomEmptyTaskMessage()
              }
            />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEditTask={setEditingTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </ScrollView>

        <AddButton onPress={() => setShowAddModal(true)} />

        <TaskModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTask}
          title="New Task"
        />

        <TaskModal
          visible={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(taskData) => {
            if (editingTask) {
              return handleUpdateTask(editingTask.id, taskData);
            }
            return Promise.resolve(false);
          }}
          task={editingTask}
          title="Edit Task"
        />

        <FilterDropdown
          visible={showFilterDropdown}
          onClose={() => setShowFilterDropdown(false)}
          filterOptions={filterOptions}
          onFilterChange={setFilterOptions}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    marginTop:20
  },
  content: {
    flex: 1,
  },
});

export default DashboardScreen;
