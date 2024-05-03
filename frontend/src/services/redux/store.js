import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../auth/redux/authSlice";


import { authApi } from "../../auth/services/authService";
import productSlideReducer from "../../services/redux/productSlice";
import { checkoutSlice } from "./checkoutSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlideReducer,
   
    [authApi.reducerPath]:authApi.reducer,
    [checkoutSlice.reducerPath]:checkoutSlice.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
   
});
export default store;
