import express from 'express'
import { cancelOrder, getSingleOrder, getUserOrders, placeOrder } from '../controllers/orderController.js';
import isAuthenticated from '../middlewares/authMiddleware.js'

const orderRouter = express.Router();

orderRouter.get("/", isAuthenticated, getUserOrders);
orderRouter.post("/", isAuthenticated, placeOrder);
orderRouter.get("/:id", isAuthenticated, getSingleOrder);
orderRouter.put("/cancel/:id", isAuthenticated, cancelOrder);

export default orderRouter;