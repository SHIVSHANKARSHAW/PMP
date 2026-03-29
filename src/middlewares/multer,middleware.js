import multer from "multer";

const storage = multer.diskStorage({
    destination: function(Req, file, cb){
        cd(null, `./public/images`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({
    storage,
    limits : {
        fileSize: 1 * 1000 * 1000,
    },
});