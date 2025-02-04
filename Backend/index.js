const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Model/UserSchema");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://root:secret@localhost:27017/testl?authMechanism=DEFAULT&authSource=admin";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.post("/signup", async (req, res) => {
    let { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
        return res.status(400).json("All fields are required");
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("Email already exists");
        }
        const newUser = new User({ email, firstName,lastName });
        console.log("newUser",newUser);
        await newUser.save();
        res.status(201).json("User registered successfully");
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json("Server error during signup");
    }
});

app.post("/login", async (req, res) => {
    let { email, firstName } = req.body;
    if (!email || !firstName) {
        return res.status(400).json("All fields are required");
    }
    try {
        const user = await User.findOne({ email });
        console.log("user",user);
        if (!user) {
            return res.status(400).json("User not found");
        }
        res.status(200).json("Login successful");
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json("Server error during login");
    }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
