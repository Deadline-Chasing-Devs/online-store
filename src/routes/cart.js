import express from "express";

const handler = () => {
    const cartRouter = express.Router();

    // handle route
    cartRouter.get("", (req, res) => {
        res.render("cart");
    });

    return cartRouter;
};

export default handler;
