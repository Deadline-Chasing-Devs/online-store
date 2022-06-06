import express from "express";
import { checkSchema, validationResult } from "express-validator";
import Cart from "../models/cart.js";
import { getItemById } from "../util/database.js";

const handler = (pool) => {
    const cartRouter = express.Router();

    // Get cart page
    cartRouter.get("", (req, res) => {
        res.render("cart", { cart: req.session.cart || {} });
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
                errorMessage: "Quantity must be an integer greater than 0.",
            },
            custom: {
                options: (value, { req }) => {
                    if (
                        req.session.cart !== undefined &&
                        ((req.session.cart.items[req.body.itemId] &&
                            req.session.cart.items[req.body.itemId].qty +
                                parseInt(value) >
                                20) ||
                            parseInt(value) > 20)
                    ) {
                        throw new Error(
                            "You cannot add more than 20 of the same item to the cart."
                        );
                    }
                    return true;
                },
            },
        },
    };
    cartRouter.post("/add-item", checkSchema(addToCartSchema), (req, res) => {
        // validate if itemId and quantity are in proper types
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
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
                    if (
                        !req.session.cart ||
                        // eslint-disable-next-line no-prototype-builtins
                        !req.session.cart.items.hasOwnProperty(value)
                    ) {
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
                    message: "Invalid input.",
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

    // Clear cart
    cartRouter.delete("", (req, res) => {
        req.session.cart = new Cart({});
        res.status(200).json({
            success: true,
        });
    });
    return cartRouter;
};

export default handler;
