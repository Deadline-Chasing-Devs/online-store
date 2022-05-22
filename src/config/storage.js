import multer from "multer";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: function (req, file, cb) {
        cb(null, randomUUID());
    },
});

const uploadHandler = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only .png, .jpg and .jpeg formats are allowed."), false);
        }
    },
});
export default uploadHandler;
