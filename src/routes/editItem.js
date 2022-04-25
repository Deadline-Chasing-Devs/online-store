import express from "express";

const handler = () => {
    const editItemRouter = express.Router();

    // handle route
    // added for testing purposes
    editItemRouter.get("", (req, res) => {
        res.render("orders");
    });

    return editItemRouter;
};

export default handler;
