import { createSlice } from "@reduxjs/toolkit";

const initState = {
    id: '',
    username: '',
    fullname: '',
    phone: '',
    role: '',
    token: '',
}

const authslice = createSlice({
    name: 'Auth_slice',
    initialState: initState,
    reducers: {
        authSignin: (state, action) => {
            state.id = action.payload.infor.id;
            state.username = action.payload.infor.username;
            state.fullname = action.payload.infor.fullname;
            state.phone = action.payload.infor.phone;
            state.role = action.payload.infor.role;
            state.token = action.payload.infor.token;
        },
        authReload: (state, action) => {
            let user = JSON.parse(localStorage.getItem('user'));
            let token =  localStorage.getItem('token');

            state.id = user.id;
            state.username = user.username;
            state.fullname = user.fullname;
            state.phone = user.phone;
            state.role = user.role;
            state.token = token? token : '';
        },
        authLogout: (state, action) => {
            localStorage.clear();
            state.token = '';
        }
    }
})

export const { authSignin, authReload, authLogout } = authslice.actions;

export default authslice.reducer;