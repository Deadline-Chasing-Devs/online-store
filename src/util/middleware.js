import { SESS_NAME } from "../config/constants.js";

// When acessing `/login`, if session is available, redirect to the dashboard
export const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else {
        next();
    }
};

// For all the protected routes, if session is unavailabale, redirect to login
export const authChecker = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.clearCookie(SESS_NAME);
        res.redirect("/login");
    }
};
