import express from "express";
import { checkSchema, validationResult } from "express-validator";
import Cart from "../models/cart.js";
import { getItemById } from "../util/database.js";

const handler = (pool) => {
    const cartRouter = express.Router();

    // Get cart page
    cartRouter.get("", (req, res) => {
        // console.log("GET SESSION OBJ", req.session);
        res.render("cart", { cart: req.session.cart || {} });
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
                success: false,
                message: "Invalid input."
            });
        }

        req.session.cart = new Cart(req.session.cart || {});
        req.session.cart.addItem(item, parseInt(req.body.quantity));
        res.status(200).json({
            success: true,
            message: "Added to the cart.",
        });
    });

    // Remove item from cart
    const removeItemSchema = {
        itemId: {
            custom: {
                options: (value, { req }) => {
                    console.log(req.session.cart.items);
                    // eslint-disable-next-line no-prototype-builtins
                    if (!req.session.cart || !req.session.cart.items.hasOwnProperty(value)) {
                        return Promise.reject("Invalid item id.");
                    }
                    return true;
                },
            },
        },
    };
    cartRouter.post(
        "/remove-item",
        checkSchema(removeItemSchema),
        (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid input."
                });
            }
            req.session.cart = new Cart(req.session.cart);
            req.session.cart.removeItem(req.body.itemId);
            res.status(200).json({
                success: true,
                message: "Removed item from cart.",
            });
        }
    );
    return cartRouter;
};

export default handler;
