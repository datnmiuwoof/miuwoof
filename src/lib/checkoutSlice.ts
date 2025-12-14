import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CheckoutState {
  selectedIds: string[];
}

const STORAGE_KEY = "selectedItems";

// Load từ localStorage lúc khởi tạo
const loadSelectedFromLocal = (): string[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Lưu vào localStorage
const saveSelectedToLocal = (list: string[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};

const initialState: CheckoutState = {
  selectedIds: loadSelectedFromLocal(), // load khi slice init
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    toggleSelect: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(x => x !== id);
      } else {
        state.selectedIds.push(id);
      }
      saveSelectedToLocal(state.selectedIds);
    },

    clearSelected: (state) => {
      state.selectedIds = [];
      saveSelectedToLocal(state.selectedIds);
    },

    resetSelect: (state) => {
     state.selectedIds = [];
     saveSelectedToLocal(state.selectedIds);
    }

    
  }

  
});

export const selectSelectedTotal = (state: RootState): number => {
  const cartItems = state.cart?.listProduct ?? [];
  const selectedIds = state.checkout?.selectedIds ?? [];

  if (selectedIds.length === 0 || cartItems.length === 0) return 0;

  return cartItems
    .filter((item) => item?.uniqueId && selectedIds.includes(item.uniqueId))
    .reduce((total, item) => {
      const originalPrice = item.variant?.price || 0;
      const discountValue = item.discounts?.[0]?.discount_value || 0;

      const priceAfterDiscount = Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)));

      return total + priceAfterDiscount * item.quantity;
    }, 0);
};

export const selectSelectedCount = (state: RootState): number => {
  return state.checkout?.selectedIds?.length ?? 0;
};

export const { toggleSelect, clearSelected, resetSelect } = checkoutSlice.actions;
export default checkoutSlice.reducer;
