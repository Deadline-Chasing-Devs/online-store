import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { deleteItem, editItem, getImageIdsByItemId, getItemById, getOrderIdsIncludingItem } from "../util/database.js";
import { deleteFile } from "../util/helpers.js";
import { authChecker } from "../util/middleware.js";

const handler = (pool) => {
    const editItemRouter = express.Router();

    // Get edit item page
    editItemRouter.get("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);
        const images = await getImageIdsByItemId(pool, itemId);

        if (!item) res.redirect("/dashboard");
        else res.render("editItem", {
            item,
            images,
            updateSuccess: req.flash("update-success") || [],
            error: req.flash("error")
        });
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
                return res.redirect(`/edit-item/${itemId}`);
            }

            await editItem(
                pool,
                itemId,
                req.body.name,
                req.body.description,
                req.body.price
            );
            req.flash("update-success", "Item updated successfully.");
            res.redirect(`/edit-item/${itemId}`);
        }
    );

    editItemRouter.delete("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);
        if (!item) {
            res.status(400).send();
            return;
        }

        const availableOrderIds = await getOrderIdsIncludingItem(pool, itemId);
        if (availableOrderIds.length) {
            req.flash("error", "Cannot delete this item: There are orders including this item.");
            res.status(400).send();
            return;
        }

        const imageIds = await getImageIdsByItemId(pool, itemId);
        if (imageIds.length) {
            imageIds.forEach(val => deleteFile(`public/uploads/${val.image_id}`));
        }

        await deleteItem(pool, itemId);
        res.status(200).send();
    });

    return editItemRouter;
};

export default handler;
