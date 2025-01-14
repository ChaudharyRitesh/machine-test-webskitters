// src/screens/LoginScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {validateStrongPassword} from '../utils/helper';

import Toast from 'react-native-toast-message';
import {loginUser} from '../redux/slice/authSlice';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {isLoading, error, authData} = useAppSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weakPassword, setWeakPassword] = useState(false);

  console.log('authData', authData?.token);

  useEffect(() => {
    if (authData?.token) {
      navigation.navigate('HomePage' as never);
    }
  }, [authData, navigation]);

  const onLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter username and password.',
      });
      return;
    }

    const resultAction = await dispatch(loginUser({username, password}));
    if (loginUser.fulfilled.match(resultAction)) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      navigation.navigate('HomePage' as never);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error ?? 'Unknown Error',
      });
    }
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    if (weakPassword && validateStrongPassword(newPassword)) {
      setWeakPassword(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter Password"
        value={password}
        onChangeText={handlePasswordChange}
      />

      <Button title="Login" onPress={onLogin} disabled={isLoading} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 6,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
