import multer from "multer";
import path from "path"

const assestsPath = path.resolve(process.cwd(), "src", "assests", "avatar")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.url);
        if (req.url.includes("details")) cb(null, assestsPath);
        else if (req.url.includes("post")) cb(null, "uploads/posts");
        else cb(null, "uploads/others");

    },

    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname
        cb(null, name);
    }
})

const uploadFile = multer({
    storage: storage,
})

export default uploadFile;