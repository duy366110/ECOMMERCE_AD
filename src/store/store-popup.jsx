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
        toggleLoader: (state, action) => {
            state.loader.status = !state.loader.status;
        }
    }
})

export const {messageOpen, messageClose, toggleLoader} = popupslice.actions;

export default popupslice.reducer;