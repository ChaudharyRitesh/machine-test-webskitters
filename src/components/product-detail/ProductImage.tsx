import React from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';

interface ProductImageProps {
  images: string[];
}

const ProductImage: React.FC<ProductImageProps> = ({images}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {images.map((image, index) => (
        <Image
          key={index}
          source={{uri: image}}
          style={styles.image}
          resizeMode="cover"
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 10,
  },
});

export default ProductImage;
