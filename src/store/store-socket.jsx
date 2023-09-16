import { createSlice } from "@reduxjs/toolkit";

const initState = {
    socket: null
}

const socketslice = createSlice({
    name: "socket slice",
    initialState: initState,
    reducers: {
        shareSocket: (state, action) => {
            let { socket } = action.payload;
            state.socket = socket;
        }
    }
})

export const { shareSocket } = socketslice.actions;

export default socketslice.reducer;