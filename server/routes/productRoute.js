import express from 'express'
import { getAllProducts, getProductsForCategoryPage, getProductById, getProductsByTag, getRelatedProducts } from '../controllers/productController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.get("/", isAuthenticated, getAllProducts);
productRouter.get("/:id", isAuthenticated, getProductById);
productRouter.get("/relatedproducts", isAuthenticated, getRelatedProducts);
productRouter.get("/category-page/:category", isAuthenticated, getProductsForCategoryPage);
productRouter.post("/tag", isAuthenticated, getProductsByTag);

export default productRouter;