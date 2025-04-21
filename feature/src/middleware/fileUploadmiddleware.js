import multer from "multer";
import path from "path"

const assestsPath = path.resolve(process.cwd(),"feature","src","assests")

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,assestsPath)
    },

    filename:(req,file,cb)=>{
        const name = Date.now()+ "-" + file.originalname
        cb(null,name);
    }
})

const uploadFile = multer({
    storage : storage,
})

export default uploadFile;