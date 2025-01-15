import {Dimensions} from 'react-native';

export const ADD_TO_CART = 'Item Added to Cart';
export const REMOVE_FROM_CART = 'Item Removed from Cart';

export const WEAK_PASSWORD =
  'Password must be at least 8 chars, contain letters and numbers.';

const {width, height} = Dimensions.get('window');

export const themeStyles = {
  light: {
    backgroundColor: '#fff',
    textColor: '#000',
    primaryButtonColor: '#6785F1',
    secondaryButtonColor: '#e74c3c',
    borderColor: '#bdc3c7',
  },
  dark: {
    backgroundColor: '#333',
    textColor: '#fff',
    primaryButtonColor: '#6785F1',
    secondaryButtonColor: '#e74c3c',
    borderColor: '#7f8c8d',
  },
};

export const screenDimensions = {
  width,
  height,
  isSmallScreen: width < 375,
  isLargeScreen: width > 768,
};
