const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const TOKEN_SECRET = require('../config/auth.config')
const user = db.users;
const auth = db.auth;
const cookieParser = require('cookie-parser')

const usersMiddleware = require('../middleware/users')

/* 
    ======== User Register ======== 
*/

router.post('/register', usersMiddleware.validRegister,  async (req, res) => {
    
    const {name , email, password} = req.body.data || req.body

    if (!(name && email && password)) {
        res.status(400).json({
            message: "All input is required",
            status: 400
        })
      }
    // เช็คว่าตัว email มี ข้อมูลอยู่ใน database แล้ว
    const oldUser = await user.findOne({ 
        where: {
            email: email
        }
     });
  
    if (oldUser) {
        return res.status(409).json({
            message: "User Already Exist. Please Login",
            status: 409
        })
    };
    // hashCode (เข้ารหัสข้อมูล)
    const salt = await bcrypt.genSalt(10)
    const hashcode = await bcrypt.hashSync((email + password), salt)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    // สร้างข้อมูล ใน TB user
    user.create({
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
        permission: 1,
        idUser: hashcode,
    }).then(user => {
        res.status(200).json({
            message: "Users Register Succeed",
            status: 200,
            data: {
                id: user.id,
                name: user.name,
                email: user.email 
            },
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });

    auth.create({
        idUser: hashcode
    });
});


/* 
    ======== User Login ======== 
*/

router.post('/login', async function(req, res, next){

    const {email, password} = req.body
    const epass = email + password

    const users = await user.findOne({ where: { email: email } }); //หา email ที่ตรงกันใน database
    if (!users) {
        return res.status(400).json({
            auth: false,
            message: "Email address is invalid.",
            status: 400
        });
    }
    const autecompare = await auth.findOne({ where: { idUser: users.idUser } });
    if ( !autecompare || users.idUser !== autecompare.idUser) {
        return res.status(400).json({
            auth: false,
            message: "The data in the table does not match.",
            status: 400
        });
    }
    const valididUser = bcrypt.compareSync(epass, users.idUser)  //เปรียบเทียบ ค่า ที่ได้จากการ login กับ idUser
    if (!valididUser) {
        return res.status(400).json({
            auth: false,
            message: "invalid password",
            status: 400
        });
    }
    
    const token = jwt.sign({ idUser: users.idUser, name: users.name}, TOKEN_SECRET.secret, {expiresIn: "5m"}); // นำ idUser มา gen jwt Token
    users.update({token: token})
    res.header('Authorization', token) //เอา Token ที่ได้มาเก็บไว้ใน header 
    return res
        .cookie("Authorization", token, {
            expiresIn: 60 * 60 * 24,
            httpOnly: true,
        })
        .status(200)
        .json({
            auth: true,
            message: "Login Success",
            token: token,
            expiresIn: "5m",
            status: 200
         })

});

/* 
    ======== GET User ======== 
*/

router.get('/getuser', async function(req, res, next){
    user.findAll({ 
        attributes: ['id','name', 'email', 'permission'],
    }).then( userData => {
        res.status(200).json({
            userData
        })
    }).catch(error => {
        res.status(500).json({
          message: "Error!",
          error: error
        });
    });
})


/* 
    ======== DELETE User ======== 
*/

router.delete('/delete', async function(req, res, next){
    const { id } = req.query
    user.destroy({
        where: {
           id: id 
        }
     }).then(function(rowDeleted){ 
       if(rowDeleted === 1){
        res.status(200).json({
            status : 200,
            massage: 'Deleted successfully'
        })
        }
     }, function(err){
        res.status(500).json({
            message: "Error!",
            error: err
        });
     });
})

module.exports = router;