import express from "express";
import { authChecker } from "../util/middleware.js";

const handler = () => {
    const editItemRouter = express.Router();

    editItemRouter.get("", authChecker, (req, res) => {
        res.render("editItem");
    });

    return editItemRouter;
};

export default handler;
