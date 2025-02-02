import { OrderFormData } from "@/utils/types";
import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  
  interface AuthState {
   orders:OrderFormData[],
   loading:boolean,
   error:string | null
  }
  
  export const fetchOrders = createAsyncThunk(
    "api/order",
    async () => {
      let response = await fetch("api/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get orders");
      }
      const data = await response.json();
      return data;
    }
  );
  const initialState: AuthState = {
    orders:[],
    loading:false,
    error:null,
  }
  
  const orderSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setOrders: (state, action) => {
       state.orders = action.payload.orders;
       state.loading = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.orders = action.payload.orders;
          state.loading = false;
        })
        .addCase(fetchOrders.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
          console.error("Order fetching failed:", action.error.message);
          state.loading = false;
          state.error = action.error.message || "Fetching Failed";
        });
    },
  });
  
  export const { setOrders } = orderSlice.actions;
  
  export default orderSlice.reducer;
  