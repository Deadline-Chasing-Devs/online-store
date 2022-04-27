import express from "express";
import { getItemById } from "../util/database.js";
import { authChecker } from "../util/middleware.js";

const handler = (pool) => {
    const editItemRouter = express.Router();

    editItemRouter.get("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);

        if (!item) res.redirect("/dashboard");
        else res.render("editItem", { item });
    });

    return editItemRouter;
};

export default handler;
