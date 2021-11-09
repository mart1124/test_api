const { name } = require('ejs');
const fs = require('fs');
const path = require("path")
const db = require('../models');
const dbFile = db.files;
const dbhistory = db.history;


const uploadFiles = (req , res) => {
    try{
        if (req.file == undefined){
            return res.send("Please select file.")
        }
        const { C_helmet, C_nothelemt } = req.body
        var fullUrl = req.protocol + '://' + req.get('host') + "/api/stream/" + req.file.filename;
        dbFile.create({
            type: req.file.mimetype,
            name: req.file.filename,
            data: fullUrl,
            helmet_count: parseInt(C_helmet),
            not_helmet_count: parseInt(C_nothelemt),
            status: true
        }).then(resdata => {
            res.json({
                massage: "OK",
                statusCode: 200,
                id: resdata.id,
                name: resdata.name,
                upload_url: resdata.data
            })
        })
    } catch(error){
        console.log("ERROR:",error);
        return res.send(error)
    }
}

const  uploadConfig = async (req, res) => {
    const {id, uploadurl, helmet, not_helmet } = req.body

    if (!(uploadurl && helmet && not_helmet )) {
        res.status(400).json({
            message: "All input is required",
            status: 400
        })
    }
    const Filedata = await dbFile.findOne({ where: { id: id } }); //หา email ที่ตรงกันใน database
    Filedata.update({
        data: uploadurl,
        helmet_count: helmet,
        not_helmet_count: not_helmet,
    }).then( config => {
        res.status(200).json({
            massage: "Update data Succeed",
            status: "OK",
            config
            
        })
    }).catch(error => {
        console.log("ERROR:",error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });

}

const uploadImgFiles = (req , res) => {
    try{
        if (req.file == undefined){
            return res.send("Please select file.")
        }

        const { cameralocation , C_helmet, C_nothelemt } = req.body
    
        dbhistory.create({
            type: req.file.mimetype,
            name: req.file.filename,
            // pic: req.file.path,
            pic: fs.readFileSync(
                req.file.path
            ),
            Location: cameralocation || "test",
            helmet_count: parseInt(C_helmet) || 0,
            not_helmet_count: parseInt(C_nothelemt) || 0,
            status: true
        }).then(resdata => {
            fs.writeFileSync(
                __basedir + "/resources/upload/tmp/" + resdata.name, resdata.pic
            )
            return res.json({
                massage: "file has been uploaded.",
                statusCode: 200,
            })
        })
    } catch(error){
        console.log("ERROR:",error); 
        return res.send(error)
    }
}


module.exports = {
    uploadFiles,
    uploadConfig,
    uploadImgFiles
}