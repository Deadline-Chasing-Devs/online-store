import express from "express";
import {getImageIdsByItemId,getItemById,getItems, getItemCount,getItemsForCustomer} from "../util/database.js";
import Item from "../models/item.js";

const handler = (pool) => {
    const itemRouter = express.Router();

    // handle route
    itemRouter.get("/:item_id", async (req,res) => {
        const itemId = req.params.item_id;
        const item = await getItemById(pool,itemId);
        const itemImages = await getImageIdsByItemId(pool,itemId);
        if(item == null || item.availability === 0){
            res.redirect('/');
        }
        res.render("item",{item: item, itemimg: itemImages});
    });


    return itemRouter;
};

export default handler;
