import express from "express";
import {getItemCount,getItemsForCustomer} from "../util/database.js";

const handler = (pool) => {
    const homepageRouter = express.Router();

    // handle route
    homepageRouter.get("",async (req, res) => {
        const noofItems = await getItemCount(pool);
        const items = await getItemsForCustomer(pool,0,noofItems);
        let i;
        let availableItems = [];
        var j = 0;
        for(i=0; i < items.length; i++){
            if(items[i].availability === 1){
                availableItems[j] = items[i];
                j++;
            }
        }
        res.render("homepage",{items: availableItems, size: j});
    });

    return homepageRouter;
};

export default handler;
