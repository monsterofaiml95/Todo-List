const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../schemas/user.js')
const cookieParser = require('cookie-parser')
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.post("/",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username:username});
    if(user){
        const userActualPassword = user.password;
        const authorised = await bcrypt.compare(password,userActualPassword);
        console.log(authorised);
        if(authorised){
            const token = jwt.sign({username:username,password:password},process.env.SECRET_KEY);
            res.cookie('jwt',token, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000000
             });
            console.log(token);
        }

        res.status(200).json({
            authorised
        });
    }
    else{
        res.status(404).json({
            msg:"Invalid Username"
        });
    }
});

router.get("/",(req,res)=>{
    const token = req.cookies.jwt;
    // console.log(token);
    if(!token){
        return res.status(403).json({ 
            msg: 'No token provided'
         });
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                msg: "Invalid Token"
            })
        }
        res.status(200).json({
            msg:" User is Authorised",
            username:decoded.username
        });
    });
});

module.exports = router;
