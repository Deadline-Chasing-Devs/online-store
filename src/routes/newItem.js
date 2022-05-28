import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { addImage, addItem } from "../util/database.js";
import { authChecker } from "../util/middleware.js";
import { randomUUID } from "crypto";
import upload from "../config/storage.js";
import { deleteFile } from "../util/helpers.js";

const handler = (pool) => {
    const newItemRouter = express.Router();

    newItemRouter.get("", authChecker, (req, res) => {
        res.render("newItem", {
            user: req.session.user,
            validationError: req.flash("validationError") || [],
            fileError: req.flash("fileError") || [],
            success: req.flash("success") || [],
        });
    });

    const newItemSchema = {
        name: {
            notEmpty: true,
        },
        description: {
            notEmpty: true,
        },
        price: {
            notEmpty: true,
            isFloat: {
                options: {
                    min: 0
                }
            },
        },
        availability: {
            notEmpty: true
        }
    };

    const imageUpload = upload.fields([
        {
            name: "cover-photo",
            maxCount: 1,
        },
        {
            name: "images",
            maxCount: 3,
        },
    ]);

    newItemRouter.post(
        "",
        authChecker,
        (req, res, next) => {
            imageUpload(req, res, (err) => {
                if (err) {
                    console.log(err);
                    req.flash("fileError", "File uploading error.");
                    res.redirect("/new-item");
                    return;
                } else {
                    next();
                }
            });
        },
        checkSchema(newItemSchema),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                if (req.files && Object.keys(req.files).length !== 0) {
                    Object.keys(req.files).forEach((key) => {
                        req.files[key].forEach(async (image) => {
                            await deleteFile(image.path);
                        });
                    });
                }
                req.flash("validationError", errors.array()[0]);
                res.redirect("/new-item");
                return;
            }

            const { name, description, price, availability } = req.body;
            const itemId = randomUUID();
            let coverPhotoPath;
            let imagePaths;
            if (req.files && Object.keys(req.files).length !== 0) {
                if (req.files["cover-photo"])
                    coverPhotoPath = req.files["cover-photo"][0].filename;
                if (req.files["images"])
                    imagePaths = req.files["images"].map(
                        (image) => image.filename
                    );
            }
            try {
                await addItem(
                    pool,
                    itemId,
                    name,
                    description,
                    price,
                    coverPhotoPath ? coverPhotoPath : null,
                    availability === "true" ? true : false
                );
                if (coverPhotoPath) {
                    await addImage(pool, itemId, coverPhotoPath);
                }
                if (imagePaths) {
                    imagePaths.forEach(async (imagePath) => {
                        await addImage(pool, itemId, imagePath);
                    });
                }
            } catch (err) {
                console.log(err);
            }
            req.flash("success", "Added item successfully.");
            res.redirect("/new-item");
        }
    );

    return newItemRouter;
};

export default handler;
