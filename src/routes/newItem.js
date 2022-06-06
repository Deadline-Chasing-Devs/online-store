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
            validationError: req.flash("new-item-validation-error") || [],
            fileError: req.flash("new-item-file-error") || [],
            success: req.flash("new-item-success") || [],
        });
    });

    const newItemSchema = {
        name: {
            notEmpty: true,
            errorMessage: "Name cannot be empty.",
            isLength: {
                errorMessage: "Max length of the name is 50 characters.",
                options: {
                    max: 50,
                }
            }
        },
        description: {
            notEmpty: true,
            errorMessage: "Description cannot be empty.",
            isLength: {
                errorMessage: "Max length of the description is 65535 characters.",
                options: {
                    max: 65535,
                }
            }
        },
        price: {
            notEmpty: true,
            errorMessage: "Price cannot be empty.",
            isFloat: {
                errorMessage: "Price must be a float between 0 and 99999999.99.",
                options: {
                    min: 0,
                    max: 99999999.99,
                }
            },
        },
        availability: {
            notEmpty: true,
            errorMessage: "Availability cannot be empty.",
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
                    req.flash("new-item-file-error", "File uploading error.");
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
                req.flash("new-item-validation-error", errors.array());
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
            req.flash("new-item-success", "Added item successfully.");
            res.redirect("/new-item");
        }
    );

    return newItemRouter;
};

export default handler;
