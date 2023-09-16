import { createSlice } from "@reduxjs/toolkit";

const initState = {
    // MESSAGE
    message: {
        status: false,
        content: ''
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
        }
    }
})

export const {messageOpen, messageClose} = popupslice.actions;

export default popupslice.reducer;