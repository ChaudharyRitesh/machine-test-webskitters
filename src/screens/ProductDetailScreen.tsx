import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {fetchProductById} from '../redux/slice/productSlice';
import ProductImage from '../components/product-detail/ProductImage';
import ProductInfo from '../components/product-detail/ProductInfo';
import Description from '../components/product-detail/ProductDescription';
import Reviews from '../components/product-detail/Reviews';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconButton from '../common/IconButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {addToCart} from '../redux/slice/cartSlice';

const ProductDetailScreen = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const {selectedProduct, isLoading, error} = useAppSelector(
    state => state.product,
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct && !selectedProduct.description) {
      dispatch(fetchProductById(selectedProduct.id));
    }
  }, [selectedProduct, dispatch]);

  const updateCart = () => {
    if (!selectedProduct) {
      return;
    }

    const item = {
      id: selectedProduct.id.toString(),
      title: selectedProduct.title,
      price: selectedProduct.price,
      quantity: quantity,
      image: selectedProduct.images[0],
      form: selectedProduct.form,
    };
    dispatch(addToCart(item));

    Toast.show({
      type: 'success',
      text1: 'Item Quantity Updated',
      text2: `${selectedProduct.title} quantity has been updated in your cart.`,
      visibilityTime: 1000,
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
    updateCart();
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      updateCart();
    }
  };

  if (!selectedProduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No product selected.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <TouchableOpacity onPress={() => nav.goBack()} style={{padding: 10}}>
            <EvilIcons name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.productCategory}>Powder & Capsules</Text>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <View style={styles.hotTagContainer}>
            <Text style={styles.hotTag}>Hot</Text>
          </View>
          <ProductImage images={selectedProduct.images} />
          <ProductInfo weight={selectedProduct.weight} />

          <Description description={selectedProduct.description} />
          <Reviews reviews={selectedProduct.reviews || []} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.price}>
              <Text style={styles.sign}>£ </Text>
              {selectedProduct.price}
            </Text>
            <Text style={styles.deliveryText}>Delivery Not Included</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
            }}>
            <IconButton
              onPress={decrementQuantity}
              icon="-"
              color="red"
              bgColor="white"
            />
            <View>
              <Text>{quantity}</Text>
            </View>
            <IconButton
              onPress={incrementQuantity}
              icon="+"
              color="white"
              bgColor="#6785F1"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1, backgroundColor: '#EDEFF3'},
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#EDEFF3',
    paddingBottom: 100,
  },
  mainContent: {
    padding: 16,
    backgroundColor: '#EDEFF3',
  },
  sign: {
    fontSize: 14,
    color: '#aaa',
  },
  productCategory: {
    fontSize: 14,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  hotTagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  hotTag: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  deliveryText: {
    fontSize: 13,
    color: '#7f8c8d',
    fontWeight: 'medium',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;
