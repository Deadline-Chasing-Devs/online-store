import express from "express";
import { authChecker } from "../util/middleware.js";

const handler = () => {
    const dashboardRouter = express.Router();

    // handle route
    dashboardRouter.get("", authChecker, (req, res) => {
        res.render("dashboard");
    });

    return dashboardRouter;
};

export default handler;
