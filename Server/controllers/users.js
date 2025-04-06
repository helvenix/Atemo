import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = require('../models/User');

export const registerUser = async (req, res) => {
    try{
        const { name, email, password, profilePicture, preferences } = req.body;

        if(User.findOne({ email })){
            return res.status(400).json({message: 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            profilePicture,
            preferences
        });

        await user.save();
        res.status(201).json({message: 'User registered successfully', user})
    } catch (e){
        res.status(500).json({message: e.message})
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message: "Email aren't registered"})
        }
        if(!bcrypt.compare(password, user.password)){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const payload = {userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.status(200).json({
            message: 'Logged in successfully',
            token
        })
    } catch (e){
        res.status(500).json({message: e.message})
    }
}

export const getMyProfile = async (req, res) => {
    try {
        if(!req.user || !req.user.id){
            return res.status(401).json({message: "Not authenticated"});
        }
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (e){
        res.status(500).json({message: e.message})
    }
}

export const updateMyProfile = async (req, res) => {
    res.status(500).json({message: "Cant do this for now"})
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password -preferences");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (e){
        res.status(500).json({message: e.message})
    }
}