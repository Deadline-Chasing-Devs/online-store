import express from "express";

const handler = () => {
    const productsRouter = express.Router();

    // handle route
    // added for testing purposes
    productsRouter.get("", (req, res) => {
        res.render("products");
    });

    return productsRouter;
};

export default handler;