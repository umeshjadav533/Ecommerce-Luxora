import express from 'express'
import { getAllCategories, getProductsByCategory } from '../controllers/categoryController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.get("/", isAuthenticated, getAllCategories);
categoryRouter.get("/category", getProductsByCategory);
export default categoryRouter;