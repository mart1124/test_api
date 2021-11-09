const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const thumbsupply = require('thumbsupply');

router.get('/video/:name', (req, res) => {
    
    const filepath = path.resolve(__basedir + `/resources/upload/${req.params.name}`) ; 
    
    thumbsupply.generateThumbnail(filepath)
    .then(thumb => res.sendFile(thumb));
});

module.exports = router;