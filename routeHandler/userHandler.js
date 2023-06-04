const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const checkLogin = require("../middlewares/checkLogin");
const User = new mongoose.model("User", userSchema)
const router = express.Router();


// SignUp
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            username: req.body.username
        });
        await newUser.save()
        res.status(200).send({ message: "Signup successful!" });
    } catch {
        res.status(500).send({ error: "There was a server side error!" });
    }
})

// LogIn
router.post("/login", async (req, res) => {
    var user = await User.find({ username: req.body.username });
    try {
        const user = await User.find({ username: req.body.username });

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                // Generate Token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });

                res.status(200).send({
                    access_token: token,
                    message: "Login Successful!"
                })
            } else {
                res.status(401).send({ error: "Authentication failed!" })
            }
        } else {
            res.status(401).send({ error: "Authentication failed!" })
        }
    } catch (err) {
        res.status(401).send({ error: "Authentication failed!" })
    }
})

// Get All User
router.get("/", async (req, res) => {
    try {
        const users =await User.find().populate("todos");
        res.status(200).send({
            data: users,
            message: "Success"
        })
    } catch (err) {
        res.status(500).send({ error: "There was a server side error!" })
    }
})
module.exports = router;