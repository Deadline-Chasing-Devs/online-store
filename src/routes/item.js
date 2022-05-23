import express from "express";

const handler = (pool) => {
    const itemRouter = express.Router();

    // handle route

    itemRouter.get("", (req, res) => {
        res.render("item");
    });

    return itemRouter;
};

export default handler;
