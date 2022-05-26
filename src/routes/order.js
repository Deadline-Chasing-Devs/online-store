import express from "express";
import { getItemsByOrderId, getOrderById } from "../util/database.js";

const handler = (pool) => {
    const orderRouter = express.Router();

    // handle route

    orderRouter.get("/:order_id", async (req, res) => {
        const orderId = req.params.order_id;
        const order = await getOrderById(pool, orderId);
        if (!order) {
            res.redirect("/dashboard");
            return;
        }
        const orderItems = await getItemsByOrderId(pool, orderId);
        res.render("order", { order, orderItems });
    });
    return orderRouter;
};

export default handler;
