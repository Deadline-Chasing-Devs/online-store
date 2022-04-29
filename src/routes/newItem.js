import express from "express";

const handler = () => {
    const newItemRouter = express.Router();

    // handle route
    // added for testing purposes
    newItemRouter.get("", (req, res) => {
        res.render("newItem");
    });
    
    return newItemRouter;
};

export default handler;
