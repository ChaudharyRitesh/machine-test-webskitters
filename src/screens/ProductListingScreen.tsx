import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchProducts, setSelectedProduct} from '../redux/slice/productSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootLayout';

const ProductListScreen = () => {
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
      <Text style={styles.title}>{item.title}</Text>
      <Text>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Listing</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {products.length === 0 && isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
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

export default ProductListScreen;

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
  productCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
