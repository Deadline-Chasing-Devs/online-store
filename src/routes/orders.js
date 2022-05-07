import express from "express";

const handler = () => {
    const ordersRouter = express.Router();

    // handle route
    // added for testing purposes
    ordersRouter.get("", (req, res) => {
        res.render("orders");
    });

    return ordersRouter;
};

export default handler;
