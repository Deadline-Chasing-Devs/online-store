import express from "express";

const handler = () => {
    const homepageRouter = express.Router();

    // handle route
    homepageRouter.get("", (req, res) => {
        res.render("homepage");
    });

    return homepageRouter;
};

export default handler;
