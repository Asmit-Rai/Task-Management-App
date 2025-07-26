import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task, TaskFormData, Priority } from '../types/Task';
import COLORS from '@/constants/Colors';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (taskData: TaskFormData) => Promise<boolean>;
  task?: Task | null;
  title: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ 
  visible, 
  onClose, 
  onSave, 
  task, 
  title 
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0], 
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      });
      setSelectedDate(new Date(task.dueDate));
    } else {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: today,
      });
      setSelectedDate(new Date());
    }
  }, [task, visible]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (!formData.dueDate) {
      Alert.alert('Error', 'Please select a due date');
      return;
    }

    const success = await onSave(formData);
    if (success) {
      onClose();
    } else {
      Alert.alert('Error', 'Failed to save task. Please try again.');
    }
  };

  const handleDateChange = (event: any, selected: Date | undefined) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedDate(selected);
      const dateString = selected.toISOString().split('T')[0];
      setFormData({ ...formData, dueDate: dateString });
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return COLORS.white;
      case 'Medium': return COLORS.white;
      case 'Low': return COLORS.white;
      default: return COLORS.inactiveDot;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} contentContainerStyle={{paddingBottom: 32}}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.textInput}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Enter task title"
              placeholderTextColor={COLORS.subtleText}
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter task description"
              placeholderTextColor={COLORS.subtleText}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Priority</Text>
            <View style={styles.priorityRow}>
              {(['High', 'Medium', 'Low'] as Priority[]).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityOption,
                    { backgroundColor: getPriorityColor(priority) },
                    formData.priority === priority && styles.selectedPriority,
                  ]}
                  onPress={() => setFormData({ ...formData, priority })}
                  activeOpacity={0.85}
                >
                  <Text style={styles.priorityOptionText}>{priority}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Due Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.dateButtonText}>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
            accentColor={COLORS.primary}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inactiveDot,
    shadowColor: COLORS.support,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cancelButton: {
    color: COLORS.inactiveDot,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: "white",
    letterSpacing: 0.3,
  },
  saveButton: {
    color: COLORS.support,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  modalContent: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
  },
  inputGroup: {
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  textInput: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: COLORS.inactiveDot,
    color: COLORS.text,
    shadowColor: COLORS.support,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    marginRight: 12,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: COLORS.background,
    shadowColor: COLORS.support,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  selectedPriority: {
    borderWidth: 2,
    backgroundColor: COLORS.primary,
     color: COLORS.support,
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  priorityOptionText: {
    color: COLORS.support,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  dateButton: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.inactiveDot,
    shadowColor: COLORS.support,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.support,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});

export default TaskModal;