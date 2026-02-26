import express from 'express'
import { addToCart, cartSummary, getCartItems, removeFromCart, updateCartProduct } from '../controllers/cartController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get("/", isAuthenticated, getCartItems);
cartRouter.post("/add", isAuthenticated, addToCart);
cartRouter.put('/update', isAuthenticated, updateCartProduct);
cartRouter.delete('/remove', isAuthenticated, removeFromCart);
cartRouter.get('/cart-summary', isAuthenticated, cartSummary);

export default cartRouter;