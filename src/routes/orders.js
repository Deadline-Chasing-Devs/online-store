import express from "express";
import { getAllOrders } from "../util/database.js";
import { authChecker } from "../util/middleware.js";

const handler = (pool) => {
    const ordersRouter = express.Router();

    // handle route
    ordersRouter.get("", authChecker, async (req, res) => {
        const orders = await getAllOrders(pool);
        res.render("orders", { orders: orders });
    });

    return ordersRouter;
};

export default handler;
