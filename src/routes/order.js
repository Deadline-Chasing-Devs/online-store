import express from "express";
import {getOrderById} from "../util/database.js";

const handler = (pool) => {
    const orderRouter = express.Router();

    // handle route

    orderRouter.get("/:order_id", async (req,res) => {
        const orderId = req.params.order_id;
        const order = await getOrderById(pool,orderId);
        //const order = req.params.order_id;
        res.render("order",{order: order});

    });

    return orderRouter;
};

export default handler;
