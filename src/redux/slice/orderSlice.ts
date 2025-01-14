// src/redux/slice/orderSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Order {
  id: number;
  products: Array<{id: number; title: string; price: number; quantity: number}>;
  total: number;
  date: string;
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const addOrder = (order: Order) => ({
  type: 'orders/addOrder',
  payload: order,
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrderStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    addOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.orders.push(action.payload); // Add new order to the list
    },
    addOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {addOrderStart, addOrderSuccess, addOrderFailure} =
  orderSlice.actions;

export default orderSlice;
