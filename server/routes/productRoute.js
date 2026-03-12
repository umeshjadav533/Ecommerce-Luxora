import express from 'express'
import { getAllProducts, getProductsForCategoryPage, getProductById, getProductsByTag, filteredProducts } from '../controllers/productController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

// routes/productRoutes.js

productRouter.get("/", isAuthenticated, getAllProducts);

productRouter.get("/filter", isAuthenticated, filteredProducts);

productRouter.get("/category/:category", isAuthenticated, getProductsForCategoryPage);

productRouter.post("/tag", isAuthenticated, getProductsByTag);

productRouter.get("/:id", isAuthenticated, getProductById);

export default productRouter;