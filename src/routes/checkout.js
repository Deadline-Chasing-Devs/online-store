import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { addItemToOrder, addOrder } from "../util/database.js";
import { randomUUID } from "crypto";
import Cart from "../models/cart.js";

const handler = (pool) => {
    const checkoutRouter = express.Router();

    // handle route
    checkoutRouter.get("", (req, res) => {
        if (req.session.cart && Object.entries(req.session.cart.items).length) {
            res.render("checkout", {
                cart: req.session.cart,
                checkoutErrors: req.flash("checkout-error"),
            });
        } else {
            res.redirect("/");
        }
    });

    const checkoutSchema = {
        name: {
            notEmpty: true,
            errorMessage: "Name cannot be empty.",
            isLength: {
                errorMessage: "Max length of the name is 50 characters.",
                options: {
                    max: 50,
                },
            },
        },
        contactNumber: {
            notEmpty: true,
            errorMessage: "Contact number cannot be empty.",
            isNumeric: {
                errorMessage: "Contact number must be numeric."
            },
            isLength: {
                errorMessage: "Max length of the contact number is 15 characters.",
                options: {
                    max: 15,
                },
            },
        },
        address: {
            notEmpty: true,
            errorMessage: "Address cannot be empty.",
            isLength: {
                errorMessage: "Max length of address is 100 characters.",
                options: {
                    max: 100,
                },
            },
        },
        email: {
            notEmpty: true,
            errorMessage: "Email cannot be empty.",
            isLength: {
                errorMessage: "Max length of the email is 50 characters.",
                options: {
                    max: 50,
                },
            },
        },
    };

    checkoutRouter.post("", checkSchema(checkoutSchema), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("checkout-error", errors.errors);
            res.redirect("/checkout");
            return;
        }

        if (
            !req.session.cart ||
            !Object.entries(req.session.cart.items).length
        ) {
            res.status(400).json({
                error: "Cart is empty.",
            });
            return;
        }

        const { name, contactNumber, address, email } = req.body;
        const cart = req.session.cart;
        const data = {
            customerData: {
                name,
                contactNumber,
                address,
                email,
            },
            cart,
        };

        res.render("payment-gateway", { data });
    });

    checkoutRouter.post("/success", async (req, res) => {
        if (
            !req.session.cart ||
            !Object.entries(req.session.cart.items).length
        ) {
            res.status(400).json({
                error: "Invalid request.",
            });
            return;
        }

        try {
            const customerData = req.body;
            const cart = req.session.cart;
            const orderId = randomUUID();
            await addOrder(
                pool,
                orderId,
                customerData.name,
                customerData.address,
                customerData.contactNumber,
                customerData.email,
                "PAID"
            );
            for (const [id, item] of Object.entries(cart.items)) {
                await addItemToOrder(pool, orderId, id, item.qty);
            }

            req.session.cart = new Cart({});
            res.status(200).json({
                success: true,
                orderId,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).end();
        }
    });

    return checkoutRouter;
};

export default handler;
