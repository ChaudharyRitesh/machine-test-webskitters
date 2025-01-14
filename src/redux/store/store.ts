import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import productSlice from '../slice/productSlice';
import {authSlice} from '../slice/authSlice';
import cartSlice from '../slice/cartSlice';
import orderSlice from '../slice/orderSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
