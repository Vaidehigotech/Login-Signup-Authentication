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
    let { email, firstName, lastName, password, confirmPassword } = req.body;
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
        return res.status(400).json("All fields are required");
    }
    if(password !== confirmPassword)
    {
        alert("password do not match");
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("Email already exists");

        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({ email, firstName, lastName, password:hashPassword });
        console.log("newUser",newUser);
        await newUser.save();
        res.status(201).json({message:"user registered successfully",userId:newUser._id});
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json("Server error during signup");
    }
});

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("All fields are required");
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("User not found");
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json("Server error during login");
    }
});

app.post("/dashboard", async (req, res) => {
    const { id } = req.body;
    console.log("Received ID from client:", id);
    if (!id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
