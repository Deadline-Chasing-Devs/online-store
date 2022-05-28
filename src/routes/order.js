import express from "express";
import { getItemsByOrderId, getOrderById, updateOrderStatus } from "../util/database.js";
import { authChecker } from "../util/middleware.js";

const handler = (pool) => {
    const orderRouter = express.Router();

    // handle route

    orderRouter.get("/fail", async (req, res) => {
        console.log("here fail");
        res.render("orderFail");
    });

    orderRouter.get("/:order_id", authChecker, async (req, res) => {
        const orderId = req.params.order_id;
        const order = await getOrderById(pool, orderId);
        if (!order) {
            res.redirect("/dashboard");
            return;
        }
        const orderItems = await getItemsByOrderId(pool, orderId);
        res.render("order", { user: req.session.user, order, orderItems, success: req.flash("success") });
    });

    orderRouter.post("/:order_id", authChecker, async (req, res) => {
        const orderId = req.params.order_id;
        const order = await getOrderById(pool, orderId);
        if (!order) {
            res.redirect("/dashboard");
            return;
        }

        const orderStatus = req.body.status;
        const validStatuses = ["PAID", "PROCESSING", "DISPATCHED", "DELIVERED"];
        if (!orderStatus || !validStatuses.includes(orderStatus)) {
            res.redirect(`/order/${orderId}`);
            return;
        }

        await updateOrderStatus(pool, orderId, orderStatus);
        req.flash("success", "Order status updated successfully");
        res.redirect(`/order/${orderId}`);
    });

    orderRouter.get("/success/:order_id", async (req, res) => {
        const orderId = req.params.order_id;
        const order = await getOrderById(pool, orderId);
        if (!order) {
            res.redirect("/");
            return;
        }
        
        res.render("orderSuccess");
    });

    

    return orderRouter;
};

export default handler;
