import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ProductInfoProps {
  weight: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({weight}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoItem}>
        <FontAwesome name="tint" size={20} color="#34495e" />
        <View style={styles.textContainer}>
          <Text style={styles.value}>{weight} gm</Text>
          <Text style={styles.label}>Weight</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 5,
    gap: 5,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  textContainer: {
    marginLeft: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
});

export default ProductInfo;
