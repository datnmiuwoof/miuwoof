import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { info: null, isLogin: false },
    reducers: {
        passLogin: (state, action)=>{
          state.info = action.payload;
          state.isLogin = true;
        },
        LogOut: (state)=>{
            state.info = null;
            state.isLogin = false;
        },
    }
})

export const {passLogin, LogOut} = userSlice.actions;
export default userSlice.reducer;