const User = require('../models/User');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// [GET] /api/user/
exports.getUsers = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found!!',
            });
        }

        res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

// [POST] /api/user/register
exports.postUsers = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing Username or password' });
    }
    try {
        //   Kiem tra xem co trung nguoi dung (username khong)
        const user = await User.findOne({ username });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: 'Username is exist already' });
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();

        // Dung JsonToken de kiem ra luon
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({
            success: true,
            message: 'Created User',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internet server is Sap',
        });
    }
};

// [POST] /api/user/login

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing Username or password' });
    }
    try {
        // Kiem tra xem co ton tai username chua
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect user or password',
            });
        }
        // Check pass
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            res.status(400).json({
                success: false,
                message: 'Incorrect user or password',
            });
        }

        // PASS HET
        // Dung JsonToken de kiem ra luon
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({
            success: true,
            message: 'Login successfully',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internet server is Sap',
        });
    }
};
