const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')
const {Admin} = require('../models/admin')

const authJwt ={
    
    verifyToken : async(req,res, next) =>{
    
    
        let token = req.headers['x-access-token']

        if(!token) return res.status(403).json({message: 'no token'})
    
        try {
            const decoded = jwt.verify(token,config.SECRET)
            req.userId = decoded.id

            const user = await User.findById(req.userId,{password: 0})
            if (!user) return res.status(404).json({message: 'no user found'})

            next()

        }catch (error){
        res.status(401).json({message: 'Unauthorized'})
    }
},

isAdmin : async (req,res, next) =>{
    try{

    
    const user = await User.findById(req.userId)
    const admin = await Admin.find({_id: {$in: user.admin}})

    for (let i = 0; i < admin.length; i++){
        if(admin[i].name === "admin") {
            next()
            return
        }
    }
    
    return res.status(403).json({message: "Require Admin role"})
    } catch(error){
        console.log(error);
        return res.status(500).send({ message: error });
    }
}
}
module.exports = authJwt