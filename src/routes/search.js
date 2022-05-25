import express from "express";
import { searchItemByName } from "../util/database.js";

const handler = (pool) => {
    const searchRouter = express.Router();

    // handle route
    searchRouter.get("", async (req, res) => {
        const name = req.query.name;
        let results = await searchItemByName(pool, name);
        results = results.map((item) => {
            return {
                name: item.name,
                price: item.price
            };
        });
        res.json(results);
    });

    searchRouter.get("/vendor", async (req, res) => {
        const name = req.query.name;
        let results = await searchItemByName(pool, name);
        results = results.map((item) => {
            return {
                item_id: item.item_id,
                name: item.name,
                price: item.price
            };
        });
        res.json(results);
    });

    return searchRouter;
};

export default handler;
