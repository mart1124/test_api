const express = require('express');
const router = express.Router();


router.get('/send/raspi', (req, res) => {
    
    return res.send("test send data") 
    
});

module.exports = router;