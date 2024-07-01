import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    id: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // userlogin 할 때 유저 데이터 넣어줄꺼임
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
        },

        // 로그아웃
        removeUser: (state) => {
            state.email = '';
            state.id = '';
        }
    }
})


export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;