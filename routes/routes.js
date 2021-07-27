const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/users");
const authorize = require("../middleware/auth");
const { check, validationResult } = require("express-validator");


// signin
router.post("/signin-user", (req, res) => {
    let getUser;
    //Find the user return him a token
    userSchema
      .findOne({
        email: req.body.email,
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "Authentication failed",
          });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((response) => {
        if (!response) {
          return res.status(401).json({
            message: "Authentication failed",
          });
        }
        payload = {
            user: {
              email: getUser.email,
              userId: getUser._id,
            },
          };
    
          let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
            expiresIn: "1h",
          });
          return res.status(200).json({
            token: jwtToken,
          });
        }) 
        .catch((err) => {
          res.status(401).json({
            message: "Authentication failed",
          });
    
    }); 
});
// signup
router.post("/register",(res,req,next)=>{
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user.save()
    .then((response)=>{
      res.status(201).json({
        message:"user created",
        result:response,
      })
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
      console.log(error);
    });
        
             
  })
})

// get all users 
router.route("/all-user").get(authorize, (req, res) => {
  userSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

module.exports=router;