import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { FilterOptions, Priority } from '../types/Task';

interface FilterDropdownProps {
  visible: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  visible,
  onClose,
  filterOptions,
  onFilterChange,
}) => {
  const updateFilter = (updates: Partial<FilterOptions>) => {
    onFilterChange({ ...filterOptions, ...updates });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <Text style={styles.title}>Filter & Sort</Text>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Priority</Text>
                <TouchableOpacity
                  style={[styles.item, !filterOptions.priority && styles.selectedItem]}
                  onPress={() => updateFilter({ priority: null })}
                >
                  <Text style={styles.itemText}>All Priorities</Text>
                </TouchableOpacity>
                
                {(['High', 'Medium', 'Low'] as Priority[]).map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[styles.item, filterOptions.priority === priority && styles.selectedItem]}
                    onPress={() => updateFilter({ priority })}
                  >
                    <Text style={styles.itemText}>{priority} Priority</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Status</Text>
                <TouchableOpacity
                  style={[styles.item, filterOptions.completed === null && styles.selectedItem]}
                  onPress={() => updateFilter({ completed: null })}
                >
                  <Text style={styles.itemText}>All Tasks</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.item, filterOptions.completed === false && styles.selectedItem]}
                  onPress={() => updateFilter({ completed: false })}
                >
                  <Text style={styles.itemText}>Pending Tasks</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.item, filterOptions.completed === true && styles.selectedItem]}
                  onPress={() => updateFilter({ completed: true })}
                >
                  <Text style={styles.itemText}>Completed Tasks</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sort By</Text>
                <TouchableOpacity
                  style={[styles.item, filterOptions.sortBy === 'dueDate' && styles.selectedItem]}
                  onPress={() => updateFilter({ sortBy: 'dueDate' })}
                >
                  <Text style={styles.itemText}>Due Date</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.item, filterOptions.sortBy === 'priority' && styles.selectedItem]}
                  onPress={() => updateFilter({ sortBy: 'priority' })}
                >
                  <Text style={styles.itemText}>Priority</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.item, filterOptions.sortBy === 'createdAt' && styles.selectedItem]}
                  onPress={() => updateFilter({ sortBy: 'createdAt' })}
                >
                  <Text style={styles.itemText}>Created Date</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order</Text>
                <TouchableOpacity
                  style={[styles.item, filterOptions.sortOrder === 'asc' && styles.selectedItem]}
                  onPress={() => updateFilter({ sortOrder: 'asc' })}
                >
                  <Text style={styles.itemText}>Ascending</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.item, filterOptions.sortOrder === 'desc' && styles.selectedItem]}
                  onPress={() => updateFilter({ sortOrder: 'desc' })}
                >
                  <Text style={styles.itemText}>Descending</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(49, 68, 108, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    margin: 20,
    maxWidth: 340,
    minWidth: 280,
    maxHeight: '85%',
    shadowColor: '#31446C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#F5A92122',
    zIndex: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 22,
    color: '#31446C',
    fontWeight: '700',
    lineHeight: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#31446C',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  section: {
    marginBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#F5A92122',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666AF6',
    marginBottom: 10,
    letterSpacing: 0.1,
  },
  item: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 4,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: 'transparent',
    transitionDuration: '150ms',
  },
  selectedItem: {
    backgroundColor: '#878AF5',
    borderColor: '#666AF6',
    shadowColor: '#878AF5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
  },
  itemText: {
    fontSize: 15,
    color: '#31446C',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
});

export default FilterDropdown;