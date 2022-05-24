import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { editItem, getItemById } from "../util/database.js";
import { authChecker } from "../util/middleware.js";

const handler = (pool) => {
    const editItemRouter = express.Router();

    // Get edit item page
    editItemRouter.get("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);

        if (!item) res.redirect("/dashboard");
        else res.render("editItem", { item });
    });

    // Edit item
    const editItemSchema = {
        name: {
            notEmpty: true,
        },
        description: {
            notEmpty: true,
        },
        price: {
            notEmpty: true,
            isFloat: {
                options: {
                    min: 0
                }
            },
        },
    };

    editItemRouter.post(
        "/:id",
        authChecker,
        checkSchema(editItemSchema),
        async (req, res) => {
            // Check if the itemId is valid
            const itemId = req.params.id;
            const item = await getItemById(pool, itemId);
            if (!item) {
                res.redirect("/dashboard");
                res.end();
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            await editItem(
                pool,
                itemId,
                req.body.name,
                req.body.description,
                req.body.price
            );
            res.redirect(`/edit-item/${itemId}`);
        }
    );

    return editItemRouter;
};

export default handler;
