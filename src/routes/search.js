import express from "express";
import { searchItemByName } from "../util/database.js";

const handler = (pool) => {
    const searchRouter = express.Router();

    // handle route
    searchRouter.get("", async (req, res) => {
        const name = req.query.name;
        const results = await searchItemByName(pool, name);
        // console.log(results);
        res.json(results);
    });

    return searchRouter;
};

export default handler;
