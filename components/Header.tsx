import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';

interface HeaderProps {
  onFilterPress: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterPress, onLogout }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <MaterialCommunityIcons name="filter-variant" size={22} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Tasks</Text>
        
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.optionsDot} />
          <View style={styles.optionsDot} />
          <View style={styles.optionsDot} />
        </TouchableOpacity>
      </View>

      {/* Popup Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.popupMenu}>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                setModalVisible(false);
                onLogout();
              }}
            >
              <Text style={styles.popupButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#878AF5',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
    width: 20,
  },
  optionsDot: {
    width: 4,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    marginVertical: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  popupMenu: {
    marginTop: 60,
    marginRight: 20,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  popupButton: {
    paddingVertical: 8,
  },
  popupButtonText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;