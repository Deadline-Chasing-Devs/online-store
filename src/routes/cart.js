import express from "express";
import { checkSchema, validationResult } from "express-validator";
import Cart from "../models/cart.js";
import { getItemById } from "../util/database.js";

const handler = (pool) => {
    const cartRouter = express.Router();

    // Get cart page
    cartRouter.get("", (req, res) => {
        // console.log("GET SESSION OBJ", req.session);
        res.render("cart", { cart: req.session.cart });
        // res.json(req.session);
        // res.render("cart", { cart: req.session.cart || {} });
    });

    // Add item to cart
    let item;
    const addToCartSchema = {
        itemId: {
            custom: {
                options: async (value) => {
                    item = await getItemById(pool, value);
                    if (!item) return Promise.reject("Invalid item id.");
                },
            },
        },
        quantity: {
            isInt: {
                options: { min: 1 },
            },
        },
    };
    cartRouter.post("/add-item", checkSchema(addToCartSchema), (req, res) => {
        // validate if itemId and quantity are in proper types
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        req.session.cart = new Cart(req.session.cart || {});
        req.session.cart.addItem(item, req.body.quantity);
        res.status(200).json({
            success: true,
            message: "Added to the cart",
        });
    });

    return cartRouter;
};

export default handler;
