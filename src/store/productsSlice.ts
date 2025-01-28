import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

interface ProductsState {
  products: Product[];
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

const initialState: ProductsState = {
  products: [],
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      state.cart.push(action.payload);
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
  },
});

export const { setProducts, addToCart } = productsSlice.actions;
export default productsSlice.reducer;
