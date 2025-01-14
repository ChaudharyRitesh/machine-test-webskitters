import React from 'react';
import {useAppSelector} from '../redux/hooks';
import ProductListScreen from './ProductListingScreen';

const HomeScreen = () => {
  const authData = useAppSelector(state => state.auth.authData);
  console.log('authData in home:', authData);

  return (
    <>
      <ProductListScreen />
    </>
  );
};

export default HomeScreen;
