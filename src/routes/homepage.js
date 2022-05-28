import express from "express";
import {getItemCount,getItemsForCustomer} from "../util/database.js";

const handler = (pool) => {
    const homepageRouter = express.Router();

    // handle route
    homepageRouter.get("",async (req, res) => {
        const noofItems = await getItemCount(pool);
        const items = await getItemsForCustomer(pool,0,noofItems);
        res.render("homepage",{items: items, size: noofItems});
    });

    return homepageRouter;
};

export default handler;
