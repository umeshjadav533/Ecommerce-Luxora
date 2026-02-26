import express from 'express'
import { getAllProducts, getProductByCategory, getProductById } from '../controllers/productController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.get("/", isAuthenticated, getAllProducts);
productRouter.get("/:id", isAuthenticated, getProductById);
productRouter.get("/category/:category", isAuthenticated, getProductByCategory);

export default productRouter;