import express from "express";
import { getItemById } from "../util/database.js";
import { authChecker } from "../util/middleware.js";

const handler = (pool) => {
    const editItemRouter = express.Router();

    editItemRouter.get("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);

        if (!item) res.redirect("/dashboard");
        res.render("editItem", { item: { ...item } });
    });

    return editItemRouter;
};

export default handler;
