import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
    listIds: number[]; // Chỉ cần lưu ID sản phẩm để check nhanh
}

const initialState: FavoriteState = {
    listIds: [],
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        // Cập nhật toàn bộ danh sách (khi vừa load trang/login)
        setFavorites: (state, action: PayloadAction<number[]>) => {
            state.listIds = action.payload;
        },
        // Toggle ID: Có thì xóa, chưa có thì thêm
        toggleFavoriteId: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.listIds.includes(id)) {
                state.listIds = state.listIds.filter(item => item !== id);
            } else {
                state.listIds.push(id);
            }
        }
    }
});

export const { setFavorites, toggleFavoriteId } = favoriteSlice.actions;
export default favoriteSlice.reducer;