import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  [x: string]: any;
  weight: number;
  form: string;
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  reviews: any[];
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {limit: 10, skip: (page - 1) * 10},
      });
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred',
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: number, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${productId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Product fetch failed',
      );
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    resetProducts: state => {
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [...state.products, ...action.payload];
        if (action.payload.length < 10) {
          state.hasMore = false;
        } else {
          state.page += 1;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchProductById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetProducts, setSelectedProduct} = productSlice.actions;

export default productSlice;
