const express = require('express');
const router = express.Router();


router.get('/send/raspi', (req, res) => {
    
    return res.send("1") 
    
});

module.exports = router;