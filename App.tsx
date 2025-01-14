import React from 'react';
import {Provider} from 'react-redux';

import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootLayout from './src/navigation/RootLayout';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RootLayout />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
