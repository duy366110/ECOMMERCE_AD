import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./store-auth";
import PaginationSlice from "./store-pagination";
import PopupSlice from "./store-popup";
import SocketSlice from "./store-socket";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        pagination: PaginationSlice,
        popup: PopupSlice,
        socket: SocketSlice
    }
})

export default store;