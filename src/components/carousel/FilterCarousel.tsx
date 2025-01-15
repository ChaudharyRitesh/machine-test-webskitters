/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {useAppSelector} from '../../redux/hooks';

interface FilterItemProps {
  thumbnail: string;
}

const FilterItem: React.FC<FilterItemProps> = ({thumbnail}) => {
  return (
    <TouchableOpacity style={styles.filterItem}>
      <Image source={{uri: thumbnail}} style={styles.filterImage} />
    </TouchableOpacity>
  );
};

const FilterCarousel = () => {
  const products = useAppSelector(state => state.product.products);

  // Group products by category
  const getCategories = (products: any[]) => {
    const uniqueCategories = Array.from(
      new Set(products.map(product => product.category)),
    );
    return uniqueCategories;
  };

  const categories = getCategories(products);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}>
      {categories.map((category, index) => {
        const categoryProduct = products.find(
          product => product.category === category,
        );
        return categoryProduct ? (
          <FilterItem
            key={index}
            thumbnail={categoryProduct.thumbnail} // Display category's product thumbnail
          />
        ) : null;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginVertical: 20,
  },
  filterItem: {
    backgroundColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});

export default FilterCarousel;
