import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from './cautrucdata';
import { RootState } from './store';

// Hàm lưu localStorage (chỉ dùng khi chưa login)
const saveCartToStorage = (listProduct: ICart[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(listProduct));
  }
};

// Load giỏ hàng từ localStorage khi khởi động (chỉ dùng khi chưa login)
const loadCartFromStorage = (): ICart[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState = {
  listProduct: loadCartFromStorage(),
  order: {},
  userId: null as number | null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setcart: (state, action: PayloadAction<{ userId: number; cart: ICart[] }>) => {
      state.userId = action.payload.userId;
      state.listProduct = action.payload.cart;

       saveCartToStorage(state.listProduct);
    },

    createCart: (state, action: PayloadAction<any>) => {
      // Nếu đã login → KHÔNG lưu localStorage nữa (server lo)
      if (state.userId !== null) {
        
      } else {
        const product = action.payload;
        const selectedVariant = product.selectedVariant;
        const variant = selectedVariant
          ? {
              id: selectedVariant.id,
              size: selectedVariant.size,
              style: selectedVariant.style,
              unit: selectedVariant.unit,
              flavor: selectedVariant.flavor,
              price: Number(selectedVariant.price),
              image: selectedVariant.ProductImages?.[0]?.image || "",
            }
          : null;

        const price = Number(product.finalPrice);
        const quantity = product.quantity || 1;
        const uniqueId = `${product.id}-${variant?.id || "default"}`;

        const index = state.listProduct.findIndex((item) => item.uniqueId === uniqueId);

        if (index >= 0) {
          state.listProduct[index].quantity += quantity;
          state.listProduct[index].totalPrice = state.listProduct[index].quantity * state.listProduct[index].price;
        } else {
          state.listProduct.push({
            uniqueId,
            id: product.id,
            name: product.name,
            price,
            totalPrice: price * quantity,
            quantity,
            image: variant?.image || "",
            variant,
          });
        }

        saveCartToStorage(state.listProduct);
      }
    },

   deleteCart: (state, action: PayloadAction<number>) => {
      const index = state.listProduct.findIndex((c: any) => c.id === action.payload);

      if (index >= 0) {
      state.listProduct.splice(index, 1);
      saveCartToStorage(state.listProduct);
     }
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.listProduct.findIndex(i => i.uniqueId === action.payload);
      if (index >= 0) {
        state.listProduct[index].quantity++;
        state.listProduct[index].totalPrice = state.listProduct[index].quantity * state.listProduct[index].price;
        if (state.userId === null) {
          saveCartToStorage(state.listProduct);
        }
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.listProduct.findIndex(i => i.uniqueId === action.payload);
      if (index >= 0 && state.listProduct[index].quantity > 1) {
        state.listProduct[index].quantity--;
        state.listProduct[index].totalPrice = state.listProduct[index].quantity * state.listProduct[index].price;
        if (state.userId === null) {
          saveCartToStorage(state.listProduct);
        }
      }
    }
  }
});

export const selectCartTotal = (state: RootState) =>
  state.cart.listProduct.reduce((total, item) => total + Number(item.totalPrice), 0);

export const totalQuantity = (state: RootState) =>
  state.cart.listProduct.reduce((total, item) => total + Number(item.quantity), 0);

export const { createCart, deleteCart, incrementQuantity, decrementQuantity, setcart } = cartSlice.actions;

export default cartSlice.reducer;