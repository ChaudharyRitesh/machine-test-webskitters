/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {screenDimensions} from '../constants/constants';
import {useAppDispatch} from '../redux/hooks';
import {logout} from '../redux/slice/authSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootLayout';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6785F1" barStyle="light-content" />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        <Text
          style={[
            styles.title,
            {fontSize: screenDimensions.isSmallScreen ? 24 : 30},
          ]}>
          Store
        </Text>

        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, {color: '#000', borderColor: '#bdc3c7'}]}
          placeholder="Search"
          placeholderTextColor="#7f8c8d"
        />
        <EvilIcons name="search" size={30} color="#7f8c8d" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#6785F1',
    height: 150,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: 'absolute',
    top: 115,
    zIndex: 1,
    left: 16,
    right: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
});

export default Header;
