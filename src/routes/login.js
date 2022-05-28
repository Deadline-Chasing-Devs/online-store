import express from "express";
import { getUserByUsername } from "../util/database.js";
import { sessionizeUser } from "../util/helpers.js";
import { sessionChecker } from "../util/middleware.js";

const handler = (pool) => {
    const loginRouter = express.Router();

    loginRouter.get("", sessionChecker, (req, res) => {
        // Show login page
        res.render("login", { loginError: req.flash("loginError") });
    });

    loginRouter.post("", async (req, res) => {
        const { username, password } = req.body;

        const user = await getUserByUsername(pool, username);

        if (!user || !user.isValidPassword(password)) {
            req.flash("loginError", "Invalid username or password");
            res.redirect("/login");
        } else {
            req.session.user = sessionizeUser(user);
            res.redirect("/dashboard");
        }
    });

    return loginRouter;
};

export default handler;
