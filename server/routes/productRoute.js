import express from 'express'
import { getAllProducts, getProductsForCategoryPage, getProductById, getProductsByTag, searchProducts, getFilterOptions } from '../controllers/productController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

// routes/productRoutes.js

productRouter.get("/", isAuthenticated, getAllProducts);

productRouter.get("/search", isAuthenticated, searchProducts);

productRouter.get("/search-filter", isAuthenticated, getFilterOptions);

productRouter.get("/category/:category", isAuthenticated, getProductsForCategoryPage);

productRouter.post("/tag", isAuthenticated, getProductsByTag);

productRouter.get("/:id", isAuthenticated, getProductById);

export default productRouter;