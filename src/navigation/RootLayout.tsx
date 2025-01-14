import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/LoginScreen';
import BottomTabNavigation from './MainNavigator';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  HomePage: undefined;
  Order: undefined;
  Cart: undefined;
  ProductDetail: undefined;
};

const RootLayout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login" component={AuthScreen} />

        <Stack.Screen name="HomePage" component={BottomTabNavigation} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Order" component={OrderHistoryScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootLayout;
