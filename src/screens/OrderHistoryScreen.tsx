// src/screens/OrderHistoryScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import moment from 'moment';

const OrderHistoryScreen = () => {
  const {orders, isLoading, error} = useAppSelector(state => state.order);

  const renderOrder = ({item}: {item: any}) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
      <Text>Date: {moment(item.date).format('ll') || 'N/A'}</Text>{' '}
      <Text>Total: £{item.total.toFixed(2)}</Text> <Text>Products:</Text>
      {item.products?.map((product: any) => (
        <Text key={`${item.id}-${product.id}`} style={styles.productItem}>
          - {product.title} x {product.quantity} = £
          {(product.price * product.quantity).toFixed(2)}{' '}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Details</Text>
      {isLoading && orders.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productItem: {
    marginLeft: 8,
  },
});

export default OrderHistoryScreen;
