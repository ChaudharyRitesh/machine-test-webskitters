/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  GestureResponderEvent,
  Text,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreen';
import Cart from '../screens/CartScreen';
import Order from '../screens/OrderHistoryScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={onPress || (() => {})}>
      <View style={styles.customButton}>
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const iconName: string = (() => {
            if (route.name === 'Home') {
              return 'home';
            }
            if (route.name === 'Cart') {
              return 'favorite';
            }
            if (route.name === 'Order') {
              return 'checklist';
            }
            return 'help';
          })();

          return (
            <MaterialIcons
              name={iconName}
              size={24}
              color={focused ? '#FF6347' : '#808080'}
            />
          );
        },
        tabBarLabel: ({focused}) => (
          <Animated.Text style={{color: focused ? '#FF6347' : '#808080'}}>
            {route.name}
          </Animated.Text>
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          elevation: 5,
          height: 60,
          display: route.name === 'Cart' ? 'none' : 'flex',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({}) => <EvilIcons name="cart" size={24} color="#fff" />,
          tabBarButton: props => (
            <CustomTabBarButton {...props}>
              <EvilIcons name="cart" size={28} color="gray" />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen name="Order" component={Order} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
