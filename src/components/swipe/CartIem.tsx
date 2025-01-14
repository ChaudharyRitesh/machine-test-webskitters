import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import SwipeableItem from './SwipeableItem';

interface CartItemProps {
  item: {
    id: string;
    title: string;
    form: string;
    price: number;
    quantity: number;
    image: string;
  };
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({item, onRemove}) => {
  return (
    <SwipeableItem onDelete={() => onRemove(item.id)}>
      <View style={styles.cartItem}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productSubTitle}>{item.form}</Text>
          <Text style={styles.productPrice}>
            £{item.price} x {item.quantity}
          </Text>
        </View>
      </View>
    </SwipeableItem>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#bdc3c7',
    backgroundColor: '#ecf0f1',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productSubTitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CartItem;
