import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { addItem } from "../util/database.js";
import { authChecker } from "../util/middleware.js";
import { randomUUID } from "crypto";

const handler = (pool) => {
    const newItemRouter = express.Router();

    newItemRouter.get("", authChecker, (req, res) => {
        res.render("newItem");
    });

    const newItemSchema = {
        name: {
            notEmpty: true,
        },
        description: {
            notEmpty: true,
        },
        price: {
            notEmpty: true,
            isFloat: true,
        },
    };
    newItemRouter.post(
        "",
        authChecker,
        checkSchema(newItemSchema),
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            const { name, description, price } = req.body;
            const itemId = randomUUID();
            try {
                await addItem(pool, itemId, name, description, price);
            } catch (err) {
                console.log(err);
            }
            res.redirect("/new-item");
        }
    );

    return newItemRouter;
};

export default handler;
