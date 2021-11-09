const multer = require('multer')
const path = require('path')

let fileStorageEngine =  multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype == 'image/jpeg'){
            cb(null, __basedir + "/resources/upload/img/");
        } else {
            cb(null, __basedir + "/resources/upload/");  
        }
        
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
        // cb(null, Date.now());
    }
});

// กำหนดลิมิต
const limits = {
    fields: 10,
    fileSize: 1980 * 1024,
    files: 1
};

let uploadFile =  multer({ storage: fileStorageEngine});

module.exports = uploadFile;