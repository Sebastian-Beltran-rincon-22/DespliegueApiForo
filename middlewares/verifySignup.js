const {ROLE} = require('../models/admin')
const User = require('../models/user')


const verifySignup ={

    checkDupletUserNameOrEmail :async (req,res,next) =>{
        try{
        const userFound = await User.findOne({userName: req.body.userName})
        if(userFound) return res.status(400).json({message: 'The User already exists'})

        const email = await User.findOne({email: req.body.email})
        if (email) return res.status(400).json({message: 'The Email already exists'})

        next()
        } catch (error) {
            res.status(500).json({ message: error.message });
    }
    },

    checkRoleExist: (req, res, next) => {

        if (!req.body.admin || req.body.admin.length === 0) {
            req.body.admin = ["user"]
        }
        
        for (let i = 0; i < req.body.admin.length; i++) {
            if (!ROLE.includes(req.body.admin[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.admin[i]} does not exist`});
            }
        }
        
        next();
    }
}


module.exports = verifySignup

