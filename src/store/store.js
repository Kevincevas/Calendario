import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";
import { authSlice } from './auth/authSlice';

 export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        
    },
    //solucionar problemas de las fechas
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
 })