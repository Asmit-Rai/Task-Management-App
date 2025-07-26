import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterOptions, Priority } from '../types/Task'; 
import COLORS from '@/constants/Colors';

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
}

const ALL_PRIORITIES_OPTION = { label: 'All', value: null };
const PRIORITY_OPTIONS: { label: string; value: Priority | null }[] = [
  ALL_PRIORITIES_OPTION,
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];

const ALL_STATUS_OPTION = { label: 'All', value: null };
const STATUS_OPTIONS: { label: string; value: boolean | null }[] = [
  ALL_STATUS_OPTION,
  { label: 'Incomplete', value: false },
  { label: 'Completed', value: true },
];

const FilterSheet: React.FC<FilterSheetProps> = ({
  visible,
  onClose,
  filterOptions,
  onFilterChange,
}) => {
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filterOptions);
  useEffect(() => {
    if (visible) {
      setTempFilters(filterOptions);
    }
  }, [visible, filterOptions]);

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    onClose();
  };
  
  const handleReset = () => {
    const initialFilters: FilterOptions = { priority: null, completed: null, sortBy: 'dueDate', sortOrder: 'asc' };
    setTempFilters(initialFilters);
  };

  const updateFilter = (updates: Partial<FilterOptions>) => {
    setTempFilters(prev => ({ ...prev, ...updates }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                 <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.headerButtonText}>Reset</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Priority</Text>
                  <View style={styles.chipsContainer}>
                    {PRIORITY_OPTIONS.map(({ label, value }) => (
                      <TouchableOpacity
                        key={label}
                        style={[
                          styles.chip,
                          tempFilters.priority === value && styles.chipSelected,
                        ]}
                        onPress={() => updateFilter({ priority: value })}
                      >
                        <Text style={[
                          styles.chipText,
                          tempFilters.priority === value && styles.chipTextSelected,
                        ]}>{label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Status</Text>
                  <View style={styles.chipsContainer}>
                    {STATUS_OPTIONS.map(({ label, value }) => (
                      <TouchableOpacity
                        key={label}
                        style={[
                          styles.chip,
                          tempFilters.completed === value && styles.chipSelected,
                        ]}
                        onPress={() => updateFilter({ completed: value })}
                      >
                        <Text style={[
                          styles.chipText,
                          tempFilters.completed === value && styles.chipTextSelected,
                        ]}>{label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyFilters}
                >
                  <Text style={styles.applyButtonText}>Show Results</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  headerButtonText: {
    fontSize: 16,
    color: COLORS.support, 
  },
  closeIcon: {
    padding: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterSheet;