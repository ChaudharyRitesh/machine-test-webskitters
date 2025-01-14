// src/components/SwipeableItem.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({children, onDelete}) => {
  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    height: 70,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwipeableItem;
