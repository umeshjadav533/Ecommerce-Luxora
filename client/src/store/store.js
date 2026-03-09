import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js'
import categoryReducer from '../features/category/categorySlice.js'
import productReducer from '../features/products/productSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
import wishlistReducer from '../features/wishlist/wishlistSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
})

export default store;