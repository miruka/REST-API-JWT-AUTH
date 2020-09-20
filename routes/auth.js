const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

//const { registrationValidation, loginValidation } = require("../validation");

router.post("/register", (req, res) => {
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          Message: "Email Already Exists",
        });
      } else {
        // Hash Password Using bcrypt
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              Error: err,
            });
          } else {
            // const { error } = registrationValidation(req.body);

            // if (error) {
            //   return res.status(400).send(error.details[0].message);
            // }
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              date: req.body.date,
            });

            user
              .save()
              .then((createUser) => {
                console.log(createUser);

                res.status(201).json({
                  Message: "User Created Successfully",
                  CreatedUser: createUser,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  Error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res) => {
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          Message: "Authentication Failed || User EMAIL NOT FOUND",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Authenication Failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              Message: "Auhentication Successful",
              Token: token,
            });
          }
          return res.status(401).json({
            Message: "Authenication Failed || WRONG PASSWORD",
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
});

module.exports = router;
