import multer from "multer";
import path from "path";
import sourcePath from "../sourcePath.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(sourcePath, "/public/assets/pets"));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${req.body.name}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage });
export default upload;
