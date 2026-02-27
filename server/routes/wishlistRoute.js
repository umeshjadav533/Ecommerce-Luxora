import express from 'express'
import { addToWishlist, getWishlistItems, removeFromWishlist } from '../controllers/wishlistController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const wishlistRouter = express.Router();

wishlistRouter.get("/", isAuthenticated, getWishlistItems);
wishlistRouter.post("/add", isAuthenticated, addToWishlist);
wishlistRouter.delete("/remove", isAuthenticated, removeFromWishlist);

export default wishlistRouter;