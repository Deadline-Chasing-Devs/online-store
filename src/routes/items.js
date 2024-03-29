import express from "express";
import { getItemCount, getItems } from "../util/database.js";

const handler = (pool) => {
    const itemsRouter = express.Router();

    // handle route
    itemsRouter.get("/", async (req, res) => {
        const offset = parseInt(req.query.offset) || 0;
        if (offset < 0) {
            return res.end();
        }

        const maxLimit = 10;
        let limit = parseInt(req.query.limit) || 10;

        if (limit > maxLimit) limit = maxLimit;

        const itemCount = await getItemCount(pool);
        const data = await getItems(
            pool,
            offset,
            limit
        );
        const results = {
            data: {
                page: Math.floor((offset + 1) / limit) + 1,
                totalPages: Math.ceil(itemCount / limit),
                nextOffset: offset + limit <= itemCount - 1 ? offset + limit : -1,
                previousOffset: offset - limit >= 0 ? offset - limit : -1,
                limit: limit
            },
            rows: data
        };
        res.json(results);
    });

    return itemsRouter;
};

export default handler;
