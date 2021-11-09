const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');



router.get('/*', function(req, res) {
    const requrl = req.url
    // const filepath = path.resolve(__basedir + "/resources/upload/img" + requrl) ;
    const filepath = path.resolve("/resources/upload/img" + requrl) ;
    res.json(filepath)
  })


module.exports = router;;