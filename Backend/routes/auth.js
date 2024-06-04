import express from "express";
const router = express.Router();
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticate from "../middlewares/authenticate.js";

router.post("/login", async (req, res) => {
    try {
        console.log("Login")
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status : false, error: "Please fill all the fields" });
        }
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(400).json({ status : false, error: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status : false, error: "Invalid Credentials" });
        }
        let token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
        //token to bearer token
        token = "Bearer " + token;
        // console.log("token in login", token)
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 86400000), // 1 day
            httpOnly: true, // Accessible only by the web server
            // secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only used over HTTPS
            // sameSite: 'None', // Required for cross-origin requests
        });
        return res.status(200).json({ status : true,  message: "User Login Successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
});

router.post("/register", async (req, res) => {
    try {
        console.log("register");
        const { name, email, phoneNumber, password } = req.body;
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ status : false, error: "Please fill all the fields" });
        }
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ status : false, error: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, phoneNumber, password: securePassword});
        await user.save();
        return res.status(200).json({ status : true, message: "User Registered Successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
});

router.get("/logout", (req, res) => {
    console.log("logout")
    res.clearCookie("jwtoken", { path: "/" });
    return res.status(200).json({ status : true, message: "User Logout Successfully" });
});

router.get('/validateToken', authenticate, (req, res) => {
    console.log("validateToken")
    return res.status(200).json({ status : true, userId : req.userId });
});

export default router;