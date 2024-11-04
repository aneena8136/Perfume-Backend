const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res)=> {
    const {name, email, password } = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: ' User already exists'});

        }
        //create new user

        user = new User({name, email, password});
        await user.save();
        res.status(201).json({msg:'User regisetred succesfully'});
    }catch(err){
        res.status(500).json({ error: 'server error'})
    }
});


//login route

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'invalid mail or password'});
        }

        //check password

        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(400).json({msg: 'invalid password'});
        }

        //generate token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token, user: {id: user._id, name: user.name, email: user.email}});
    }catch (err){
        res.status(500).json({error: 'server error'});
    }
});


module.exports = router;


