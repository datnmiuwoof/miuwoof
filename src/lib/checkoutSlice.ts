import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const { toggleSelect, clearSelected, resetSelect } = checkoutSlice.actions;
export default checkoutSlice.reducer;
