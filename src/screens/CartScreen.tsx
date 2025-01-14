/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {clearCart, removeFromCart} from '../redux/slice/cartSlice';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
} from '../redux/slice/orderSlice';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const {isLoading} = useAppSelector(state => state.order);

  const orderTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const deliveryCharge = 5.5;
  const summaryTotal = orderTotal + deliveryCharge;

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = async () => {
    dispatch(addOrderStart());

    try {
      // trying to mimic an payment API call
      setTimeout(() => {
        const order = {
          id: new Date().getTime(),
          products: cartItems.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          total: summaryTotal,
          date: new Date().toISOString(),
        };

        dispatch(addOrderSuccess(order as any));

        dispatch(clearCart());
      }, 2000);
    } catch (error) {
      dispatch(addOrderFailure('Failed to add order'));
    }
  };

  const nav = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={() => nav.goBack()}>
          <EvilIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>My cart</Text>

        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <View style={styles.cartItem}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productSubTitle}>{item.form}</Text>
                <Text style={styles.productPrice}>
                  £{item.price} x {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={styles.removeButton}>
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        {/* In Total Section */}
        <View style={styles.totalCard}>
          <Text style={styles.totalTitle}>In total</Text>
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Order</Text>
            <Text style={styles.totalAmount}>£{orderTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.totalAmount}>£{deliveryCharge.toFixed(2)}</Text>
          </View>
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Summary</Text>
            <Text style={styles.totalAmount}>£{summaryTotal.toFixed(2)}</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#bdc3c7',
              borderBottomWidth: 0.5,
              marginVertical: 10,
            }}
          />
          <TouchableOpacity style={styles.sendEmailButton}>
            <Text style={styles.sendEmailText}>Send to Email</Text>
            <EvilIcons
              name="envelope"
              size={24}
              color="#6785F1"
              style={{marginBottom: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <Text style={styles.checkoutText}>To Checkout</Text>
              <EvilIcons name="check" size={30} color="white" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: Platform.OS === 'android' ? 15 : 0,
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
  removeButton: {
    borderRadius: 50,
    width: 25,
    height: 25,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  removeButtonText: {
    color: '#000',
    fontSize: 14,
  },
  totalCard: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: Platform.OS === 'android' ? 55 : 0,
  },
  totalTitle: {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontFamily: 'Roboto-Medium',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendEmailButton: {
    // marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  sendEmailText: {
    color: '#6785F1',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  checkoutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
    gap: 10,
    backgroundColor: '#6785F1',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CartScreen;
