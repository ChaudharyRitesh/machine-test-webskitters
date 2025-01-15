/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; // Wishlist icon
import {RootStackParamList} from '../../navigation/RootLayout';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  fetchProducts,
  setSelectedProduct,
} from '../../redux/slice/productSlice';

const ProductList = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {products, isLoading, error, page, hasMore} = useAppSelector(
    state => state.product,
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts(page));
    }
  }, [dispatch, page, products.length]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchProducts(page));
    }
  };

  const handleSelectProduct = (item: any) => {
    dispatch(setSelectedProduct(item));
    navigation.navigate('ProductDetail');
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleSelectProduct(item)}>
      <View style={styles.cardContent}>
        <Image source={{uri: item.images[0]}} style={styles.productImage} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.form}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.rating}</Text>
            <EvilIcons name="heart" size={24} color="#FF6347" />
          </View>
          <Text style={styles.price}>£{item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const limitedProducts = products.slice(0, 15);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>Explore Products</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductListScreen')}>
          <Text>View All</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {limitedProducts.length === 0 && isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={limitedProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading && hasMore ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    marginBottom: 12,
    fontFamily: 'Roboto-Regular',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  category: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default ProductList;
