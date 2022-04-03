const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signInUser = async (req,res)=>{
    const{nickname,password} = req.body;
    const user = await User.findOne({nickname:nickname});
    
    if(user){
        const isPasswordInValide = await bcrypt.compare(password,user.password);

        if(isPasswordInValide){
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
            res.status(200).json([user,token,user._id]);
        }
        else{
            res.status(401).json({message:'User is unauthorize'});
        }
    }
    else{
        res.status(401).json({message:'User is unauthorize'});
    }    
}

exports.signUpUser = async (req,res)=>{
    const{nickname,email,phoneNumber,password} = req.body;
    const user = await User.findOne({nickname:nickname});
    
    if(user){
        res.status(409).cookie('32',2333).json({message:'User already exist'});
        return;
    }

    const hashPassword = await bcrypt.hash(password,12);

    const createdUser = new User({
        nickname:nickname,
        email:email,
        phoneNumber:phoneNumber,
        password:hashPassword
    });
    
    await createdUser.save();
    const token = jwt.sign({_id:createdUser._id},process.env.JWT_SECRET,{expiresIn:'24h'});

    res.status(201).json([createdUser,token,createdUser._id]);
}

exports.getAccount = async (req,res)=>{
    const{_id} = req.body;
    const user = await User.findOne({_id:_id});
    res.json(user);
}