import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const IconButton = ({
  icon,
  onPress,
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
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = {
  container: {
    height: 40,
    width: 40,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
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
