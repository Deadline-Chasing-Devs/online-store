import express from "express";
import {getAllOrders} from "../util/database.js";

const handler = (pool) => {
    const ordersRouter = express.Router();

    // handle route
    // added for testing purposes
    ordersRouter.get("",async (req, res) => {
        const orders = await getAllOrders(pool);
        res.render("orders", {orders: orders});
    });

    return ordersRouter;
};

export default handler;
