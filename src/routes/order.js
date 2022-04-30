import express from "express";
import { sessionChecker } from "../util/middleware.js";

const handler = () => {
    const orderRouter = express.Router();

    orderRouter.get("", sessionChecker, (req, res) => {
        res.render("order");
    });
    return orderRouter;
};

export default handler;
