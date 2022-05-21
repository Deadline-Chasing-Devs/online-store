import express from "express";

const handler = () => {
    const checkoutRouter = express.Router();

    // handle route
    checkoutRouter.get("", (req, res) => {
        res.render("checkout");
    });

    return checkoutRouter;
};

export default handler;
