const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); 
const User = require('../schemas/user.js');

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/",async (req,res)=>{
   const name = req.body.name;
   const age = req.body.age;
   const username = req.body.username;
   const gender = req.body.gender;
   const address = req.body.address;
   const password = req.body.password;

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = new User({
      name:name,
      age:Number(age),
      username:username,
      gender:gender,
      address:address,
      password:hashedPassword
   });
   
   try {
      await user.save();
      console.log("User added successfully.");
      res.status(201).json({
         msg:"User added successfully."
      });
   }
   catch(err){
      console.log("Username Already Exist.");
      res.status(406).json({
         msg:"Username Already Exist."
      })
   }

});

module.exports = router;