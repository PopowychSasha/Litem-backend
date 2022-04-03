const jwt = require('jsonwebtoken');

exports.chechAuth = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).json({message:'Invalide token'})
    }

    try{
        const isTokenFalide = jwt.verify(token,process.env.JWT_SECRET);
        console.log(isTokenFalide);
        next();
    }catch(error){
        res.status(401).json({message:'User unauthorize'})
    }
    
}