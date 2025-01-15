/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import FilterCarousel from '../components/carousel/FilterCarousel';
import Header from '../common/Header';
import ProductList from '../components/cards/ProductList';

const HomeScreen = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View
        style={{
          paddingVertical: 20,
        }}>
        <View
          style={{
            paddingTop: 20,
            marginVertical: 25,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
            }}>
            Trending Product
          </Text>
          <FilterCarousel />
        </View>
        <ProductList />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default HomeScreen;
