import {TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = ({
  icon,
  onPress,
  color,
  bgColor,
}: {
  icon: string;
  onPress: () => void;
  color: string;
  bgColor?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: bgColor}]}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = {
  container: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#6785F1',
    borderWidth: 1,
    borderColor: '#ddd',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
  },
};
