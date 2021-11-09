const jwt = require('jsonwebtoken');

/*
    Validate ข้อมูลตอนสมัคร
*/
module.exports = {
    validRegister: (req, res, next) => {
        // เช็ค name
        
        const {name , email, password} = req.body.data || req.body
        
        if (!name || name.length < 1) {
            return res.status(400).send({
                massage: "Please enter a name",
            });
        }
        // เช็ค username
        if (!email || email.length < 5) {
            return res.status(400).send({
                massage: "Please enter a username",
            });
        }
        // เช็ค password
        if (!password || password.length < 6) {
            return res.status(400).send({
                massage: "Please enter more than 6 passwords.",
            });
        }
        next();
    }
};