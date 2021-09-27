const user = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let path = require('path');
const {OAuth2Client} = require('google-auth-library');
const { response } = require("express");
const client = new OAuth2Client("755167565369-uipdr17ogav41u2c07aodc1t22svemb2.apps.googleusercontent.com");

let minm = 10000;
let maxm = 99999;

//@function For Saving New User in DataBase 
//@param {req} request Object
//@param {res} response Object
exports.createNewUser = (req, res) => {
    //Check password and verify password.
    if (req.body.password !== req.body.verifyPassword) {
        console.log("error in password");
        return res.status(400).json({ message: "Password Doesn't match" })
    }
    //encrypting Password and save the user
    const User = new user({
        username: req.body.username,
        password: req.body.password,
        Name: req.body.Name,
        email: req.body.email,
        isAdmin: false,
        isCustomer: true,
        isRestricted: false
    });
    bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(User.password, salt, (err, hashedPassword) => {
            if (err) throw err;

            User.password = hashedPassword;
            User.save().then((new_user, err) => {
                // console.log(err);
                if (err) {
                    return res.status(500).json({ error: "Server Error" })
                }
                res.status(200).json({ message: "SuccesFully Updated" })
            })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: "Updatetion Error, Please Try Again", err })
                })
        })
    })
}

//@function For Logi
//@param {req} request Object
//@param {res} response Object
exports.login = (req, res) => {
    
    user.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) return res.json(err);
        if (!foundUser) return res.status(400).json({ message: "Username not Found. Please Register or Try Again" });
        //Generate Token

        // Check password
        // console.log(foundUser)
        bcrypt.compare(req.body.password, foundUser.password).then(
            isMatch => {
                if (isMatch) {
                    jwt.sign(
                        {
                            id: foundUser._id,
                            isAdmin: foundUser.isAdmin,
                            isCustomer: foundUser.isCustomer,
                            isRestricted: foundUser.isRestricted
                        }, process.env.JWT_SECRET,
                        { expiresIn: "2d" },
                        (err, jsonToken) => {
                            if (err) throw err;
                            else {
                                foundUser.password = undefined;
                                res.json({ jsonToken, message: "Login SuccesFully Done.", user: foundUser });
                                // console.log(foundUser);
                                // req.cookie("jwt" , jwt , {
                                //     expires : new Date(Date.now() + 1000),
                                // })
                            }
                        }
                    )
                } else {
                    return res.status(400).json({ message: "Password incorrect" });
                }

            }).catch(err => {
                return res.status(400).json({ message: "Problem in password" });
            })

    })
}
//@function For getting user Detail
//@reuturn user details
exports.fetchUser = (req, res) => {
    user.findById(req.user.id)
        .select("-password")
        .then(fetchedUser => res.json(fetchedUser));
}

exports.googlelogin = (req , res) =>{
    const {tokenId} = req.body;
    client.verifyIdToken({idToken : tokenId , audience : "755167565369-uipdr17ogav41u2c07aodc1t22svemb2.apps.googleusercontent.com"}).then(response =>{
        const {email_verified , name, email} = response.playload;
        if(email_verified){
            user.findOne({email}).exec((err , us) =>{
                if(err){
                    return res.status(400).json({
                        error : "someithing went wrong..."
                    })
                }
                else{
                    if(us){
                        jwt.sign(
                            {
                                id: us._id,
                                isAdmin: us.isAdmin,
                                isCustomer: us.isCustomer,
                                isRestricted: us.isRestricted
                            }, process.env.JWT_SECRET,
                            { expiresIn: "2d" },
                            (err, jsonToken) => {
                                if (err) throw err;
                                else {
                                    us.password = undefined;
                                    res.json({ jsonToken, message: "Login SuccesFully Done.", user: us });
                                }
                            }
                        )
                    }
                    else{
                        let val = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
                        val = 'new' + toString(val);
                        let eightdigitrandom = Math.floor(10000000 + Math.random() * 90000000);
                        const User = new user({
                            username: val,
                            password: eightdigitrandom,
                            Name: name,
                            email: email,
                            isAdmin: false,
                            isCustomer: true,
                            isRestricted: false
                        });
                        bcrypt.genSalt(12, (err, salt) => {
                            if (err) throw err;
                    
                            bcrypt.hash(User.password, salt, (err, hashedPassword) => {
                                if (err) throw err;
                    
                                User.password = hashedPassword;
                                User.save().then((new_user, err) => {
                                    // console.log(err);
                                    if (err) {
                                        return res.status(500).json({ error: "Server Error" })
                                    }
                                    jwt.sign(
                                        {
                                            id: new_user._id,
                                            isAdmin: new_user.isAdmin,
                                            isCustomer: new_user.isCustomer,
                                            isRestricted: new_user.isRestricted
                                        }, process.env.JWT_SECRET,
                                        { expiresIn: "2d" },
                                        (err, jsonToken) => {
                                            if (err) throw err;
                                            else {
                                                new_user.password = undefined;
                                                res.json({ jsonToken, message: "Login SuccesFully Done.", user: new_user });
                                            }
                                        }
                                    )
                                    // res.status(200).json({ message: "SuccesFully Updated" })
                                })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(400).json({ message: "Updatetion Error, Please Try Again", err })
                                    })
                            })
                        })
                    }
                }
            })
        }
    }
    );
}


