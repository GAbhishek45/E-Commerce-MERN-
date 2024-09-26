import User from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' }); // Set expiration for the token
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please fill all the fields"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User Already Exists"
            });
        }

        // Validating email and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                msg: "Please enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                msg: "Password must be at least 8 characters long"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const existingUser = await User.create({
            name,
            email,
            password: hashedPass
        });

        const token = generateToken(existingUser._id);

        // Set the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie duration (15 days)
            secure: process.env.NODE_ENV === 'production' // Set secure flag in production
        });

        res.status(200).json({
            success: true,
            existingUser,
            token
        });

    } catch (error) {
        console.error("Error in register user: " + error.message);
        res.status(500).json({
            success: false,
            msg: "Error in user registration: " + error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please fill all the fields correctly"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User with this email not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Please provide correct email and password"
            });
        }

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie duration (15 days)
            secure: process.env.NODE_ENV === 'production' // Set secure flag in production
        });

        res.json({
            success: true,
            msg: "Logged in successfully",
            token
        });
    } catch (error) {
        console.error("Error in login user: " + error.message);
        res.status(500).json({
            success: false,
            msg: "Error in user login: " + error.message
        });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded credentials for demonstration purposes
        const adminEmail = "GAP@gmail.com";
        const adminPassword = "123456"; // Ideally, use hashed passwords

        if (email === adminEmail && password === adminPassword) {
            // Generate token with a payload including role
            const token = jwt.sign(
                { email: adminEmail, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '15d' } // Set expiration for the token
            );

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie duration (15 days)
                secure: process.env.NODE_ENV === 'production' // Set secure flag in production
            }).json({
                success: true,
                msg: "Admin Authenticated",
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                msg: "Invalid Credentials"
            });
        }
    } catch (error) {
        console.error("Error in admin login: " + error.message);
        return res.status(500).json({
            success: false,
            msg: "Error in admin login: " + error.message
        });
    }
};
