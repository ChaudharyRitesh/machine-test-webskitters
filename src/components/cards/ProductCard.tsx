import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface ProductCardProps {
  name: string;
  price: string;
  rating: number;
  image: string;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  rating,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  rating: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProductCard;
