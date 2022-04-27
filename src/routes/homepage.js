import express from "express";
import { authChecker } from "../util/middleware.js";

const handler = () => {
    const homepageRouter = express.Router();

    // handle route
    homepageRouter.get("", authChecker, (req, res) => {
        res.render("homepage");
    });

    return homepageRouter;
};

export default handler;
