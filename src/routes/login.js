import express from "express";
import { getUserByUsername } from "../util/database.js";
import { sessionizeUser } from "../util/helpers.js";
import { sessionChecker } from "../util/middleware.js";

const handler = (pool) => {
    const loginRouter = express.Router();

    loginRouter.get("", sessionChecker, (req, res) => {
        // Show login page
        res.render("login", { invalidLogin: req.query.invalid });
    });

    loginRouter.post("", async (req, res) => {
        const { username, password } = req.body;

        const user = await getUserByUsername(pool, username);

        if (!user || !user.isValidPassword(password)) {
            res.redirect("/login?invalid=true");
        } else {
            req.session.user = sessionizeUser(user);
            res.redirect("/dashboard");
        }
    });

    return loginRouter;
};

export default handler;
