import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';

const SplashScreen = () => {
  const navigation = useNavigation();

  const {authData} = useAppSelector(state => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (authData?.accessToken) {
        navigation.navigate('HomePage' as never);
      } else {
        navigation.navigate('Login' as never);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [authData, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CartApp</Text>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: '#fff',
  },
});

export default SplashScreen;
