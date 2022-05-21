import express from "express";

const handler = () => {
    const cartRouter = express.Router();

    // handle route
    cartRouter.get("", (req, res) => {
        // console.log("GET SESSION OBJ", req.session);
        res.render("cart", { cart: req.session.cart });
        // res.json(req.session);
        // res.render("cart", { cart: req.session.cart || {} });
    });

    return cartRouter;
};

export default handler;
