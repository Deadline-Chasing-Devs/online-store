import express from "express";
import {getItemById} from "../util/database.js";

const handler = (pool) => {
    const itemRouter = express.Router();

    // handle route

    itemRouter.get("/:item_id", async (req,res) => {
        const itemId = req.params.item_id;
        const item = await getItemById(pool,itemId);
        res.render("item",{item: item});
    });

    return itemRouter;
};

export default handler;
