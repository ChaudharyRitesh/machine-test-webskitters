import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({description}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 22,
  },
});

export default Description;
