import { createSlice } from "@reduxjs/toolkit";

const initState = {
    message: {
        status: false,
        content: ''
    },
    loader: {
        status: false
    }
}

const popupslice = createSlice({
    name: "popup slice",
    initialState: initState,
    reducers: {
        messageOpen: (state, action) => {
            let { content } = action.payload;
            state.message.status = true;
            state.message.content = content;
        },
        messageClose: (state, action) => {
            state.message.status = false;
            state.message.content = '';
        },
        openLoader: (state) => {
            state.loader.status = true
        },
        closeLoader: (state) => {
            state.loader.status = false
        }
    }
})

export const {messageOpen, messageClose, openLoader, closeLoader} = popupslice.actions;

export default popupslice.reducer;