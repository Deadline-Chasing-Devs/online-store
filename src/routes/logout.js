import express from "express";
import { SESS_NAME } from "../config/constants.js";

const handler = () => {
    const logoutRouter = express.Router();

    logoutRouter.get("", ({ session }, res) => {
        try {
            const user = session.user;
            if (user) {
                session.user;
                if (user) {
                    session.destroy((err) => {
                        if (err) throw err;

                        res.clearCookie(SESS_NAME);
                        res.redirect("/login");
                    });
                } else {
                    res.redirect("/login");
                }
            }
        } catch (err) {
            res.redirect("/login");
        }
    });

    return logoutRouter;
};

export default handler;
