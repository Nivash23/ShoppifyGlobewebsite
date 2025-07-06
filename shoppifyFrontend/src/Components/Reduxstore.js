import { configureStore } from "@reduxjs/toolkit";
import Products from "./Reduxslice";

export const datastore = configureStore({
    reducer: {
        Productlist:Products
    }
})