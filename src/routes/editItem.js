import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { addImage, deleteItem, editItem, getImageIdsByItemId, getItemById, getItemCoverPhoto, getOrderIdsIncludingItem, removePhoto, replaceCoverPhoto } from "../util/database.js";
import { deleteFile } from "../util/helpers.js";
import { authChecker } from "../util/middleware.js";
import upload from "../config/storage.js";

const handler = (pool) => {
    const editItemRouter = express.Router();

    // Get edit item page
    editItemRouter.get("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);
        const images = await getImageIdsByItemId(pool, itemId);
        const coverPhoto = await getItemCoverPhoto(pool,itemId);
        // console.log(coverPhoto);

        if (!item) res.redirect("/dashboard");
        else res.render("editItem", {
            item,
            coverPhoto,
            images,
            updateSuccess: req.flash("update-success") || [],
            error: req.flash("error"),
            user: req.session.user
        });
    });

    // Edit item
    const editItemSchema = {
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
            notEmpty: true,
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


    editItemRouter.post(
        "/:id",
        authChecker,

        (req, res, next) => {
            imageUpload(req, res, (err) => {
                const itemId = req.params.id;
                if (err) {
                    console.log(err);
                    req.flash("fileError", "File uploading error.");
                    res.redirect(`/edit-item/${itemId}`);
                    return;
                } else {
                    next();
                }
            });
        },

        checkSchema(editItemSchema),

        async (req, res) => {
            // Check if the itemId is valid
            const itemId = req.params.id;
            const item = await getItemById(pool, itemId);
            if (!item) {
                res.redirect("/dashboard");
                res.end();
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect(`/edit-item/${itemId}`);
            }

            let removeList = req.body.delArray.split(",");
            if(removeList[0] == "")removeList = []; // splitting a empty string give an empty string giving unexpected outcome

            const initialImageCount = parseInt(req.body.initialImageCount);
            const deletedCount = removeList.length;
            let previewImageList = [];
            
            console.log(removeList);

            let coverPhotoPath;
            let imagePaths;
            if (req.files && Object.keys(req.files).length !== 0) {
                if (req.files["cover-photo"])
                    coverPhotoPath = req.files["cover-photo"][0].filename;
                if (req.files["images"]){
                    imagePaths = req.files["images"].map(
                        (image) => image.filename
                    );
                    previewImageList = imagePaths.length;
                }
                    
            }
            
            // Calculate if limit exceeded
            let totalImages = initialImageCount + previewImageList - deletedCount;
            if (totalImages >3) {
                if (req.files && Object.keys(req.files).length !== 0) {
                    Object.keys(req.files).forEach((key) => {
                        req.files[key].forEach(async (image) => {
                            await deleteFile(image.path);
                        });
                    });
                }
                req.flash("fileError", "File Limit exceeded."); 
                return res.redirect(`/edit-item/${itemId}`); 
            }

            // Deleting Cover Photo when no file is uploaded to cover photo input
            if (req.body.oldCoverID && coverPhotoPath ==null) {
                await replaceCoverPhoto(pool, null, itemId);
                await removePhoto(pool, req.body.oldCoverID);
                await deleteFile(`./public/uploads/${req.body.oldCoverID}`);
            }

            // Replacing Cover Photo when file is uploaded to cover photo input
            if (coverPhotoPath !=null) {
                console.log("cover here : ",coverPhotoPath);
                await addImage(pool, itemId, coverPhotoPath);
                await replaceCoverPhoto(pool, coverPhotoPath, itemId);
                await removePhoto(pool, req.body.oldCoverID);
                await deleteFile(`./public/uploads/${req.body.oldCoverID}`);
            }

            // Add preview Image if limit is not exceeded
            if (imagePaths !=null) {
                imagePaths.forEach(async (currentImage)=>{
                    await addImage(pool, itemId, currentImage);
                });
            }
            
            // Delete Preview images if requested to delete
            removeList.forEach(async (element) => {
                await deleteFile(`./public/uploads/${element}`);
                await removePhoto(pool, element);
            });

            await editItem(
                pool,
                itemId,
                req.body.name,
                req.body.description,
                req.body.price,
                req.body.availability === "true" ? true : false
            );
            req.flash("update-success", "Item updated successfully.");
            res.redirect(`/edit-item/${itemId}`);
        }
    );

    editItemRouter.delete("/:id", authChecker, async (req, res) => {
        const itemId = req.params.id;
        const item = await getItemById(pool, itemId);
        if (!item) {
            res.status(400).send();
            return;
        }

        const availableOrderIds = await getOrderIdsIncludingItem(pool, itemId);
        if (availableOrderIds.length) {
            req.flash("error", "Cannot delete this item: There are orders including this item.");
            res.status(400).send();
            return;
        }

        const imageIds = await getImageIdsByItemId(pool, itemId);
        if (imageIds.length) {
            imageIds.forEach(val => deleteFile(`public/uploads/${val.image_id}`));
        }

        await deleteItem(pool, itemId);
        res.status(200).send();
    });

    return editItemRouter;
};

export default handler;
