import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthData {
  id?: number;
  username?: string;
  email?: string;
  token?: string;
}

interface AuthState {
  authData: AuthData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authData: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: {username: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        credentials,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred',
      );
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.authData = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.authData = action.payload; // stroing the user data from the login success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
