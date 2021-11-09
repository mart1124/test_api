const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const thumbsupply = require('thumbsupply');


router.get('/*',function (req, res) {
    const requrl = req.url
    const filepath = path.resolve(__basedir + "/resources/upload/" + requrl) ; 
    // const filepath = path.resolve("../resources/upload/" + requrl) ;
    
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if(range && range != ''){
        
        const parts = range.replace(/bytes=/,"").split("-");
        const start = parseInt(parts[0],10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunkSize = (end - start) + 1;

        const head = {
            'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges' : 'bytes',
            'Content-Length' : chunkSize,
            'Content-Type' : 'video/mp4' 
        }
        res.writeHead(206, head);
        var file = fs.createReadStream(filepath, {start, end} )
            .on("open", function() {
                file.pipe(res);
            }).on("error", function(err) {
                res.end(err);
            });
        
    } else {
        const head = {
            'Content-Length' : fileSize,
            'Content-Type' : 'video/mp4'
        }
        res.writeHead(200,head)
        fs.createReadStream(filepath).pipe(res)
    } 
})
 

module.exports = router;