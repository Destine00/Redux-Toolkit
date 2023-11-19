import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cart: [],
  loading: false,
  amount: 2,
  total: 0,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const resp = await axios(url);
    console.log(resp);
    return resp.data
    
  } catch (error) {
    console.log(error.message);
  }
  
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      console.log(action);
      state.cart = state.cart.filter((item) => itemId !== item.id);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cart.find((item) => item.id === payload);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cart.find((item) => item.id === payload);
      console.log(cartItem);
      cartItem.amount -= 1;
    },
    calcTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cart.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.loading = true;
    },) 
    .addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action);
      state.cart = action.payload;
      state.loading = false;
    },)
    .addCase(getCartItems.rejected, (state) => {
      state.loading = false;
    },)
  },
});

export default cartSlice.reducer;

export const { clearCart, removeItem, increase, decrease, calcTotals } =
  cartSlice.actions;
