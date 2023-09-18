const config = require ('../config')
const {Admin} = require('../models/admin')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userControllers ={
    
    //Controlador para la creacion de Usuarios & Administradores
    signup: async (req,res) =>{
        try{
        const {userName, email, password,userImg, admin} = req.body

        const userRegis = new User({
            userName,
            email,
            password,
            userImg
        })

        if(admin){
            const foundAdmin = await Admin.find({name: {$in: admin} })

            userRegis.admin = foundAdmin.map((admins) => admins._id)
        } else{
            const admins = await Admin.findOne({name: 'user'}) 

            if (admins) {
                console.log(admins._id);
                userRegis.admin = [admins._id];
            } else {
                console.log("No 'user' admin found.");
            }
        }
        const savedUser= await userRegis.save()
        console.log(userRegis)

        const token = jwt.sign({id: savedUser._id}, config.SECRET,{
            expiresIn: 86400 //tiempo de que tarda en expirar el token (cada 24h) 
        })
        res.status(200).json({token})
    }catch(error){
        return res.status(500).json(error.message)
    }
    },  

    //Controlador para la el logueo de Usuarios & Administradores
    signin: async (req,res) =>{
        try{
        const userFound =await User.findOne({email: req.body.email}).populate("admin") 

        if (!userFound) return res.status(400).json({message: 'user not found '}) // Validaciones para autentificar el usuario

        const mathPassword = await User.comparPassword(req.body.password, userFound.password) // Valida si la contraseña ingresada es la correcta

        if (!mathPassword) return res.status(401).json({token: null, message: 'invalid password '})
        
        //una vez autentificado loguea y genera un nuevo token
        const token = jwt.sign({id: userFound._id}, config.SECRET,{
            expiresIn: 86400
        })

        res.json({token, userFound: {_id: userFound._id }})
    }catch(error){
        console.log(error)
    }
},
getsingup: async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users.reverse())
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
},

    //get solo usuarios no admins :) 
    getUsersByRole: async (req, res) => {
        try {
            const adminFound = await Admin.findOne({ name: 'user' });
            if (!adminFound) {
                return res.status(404).json({ msg: 'No se encontró el rol "user".' });
            }
    
            const users = await User.find({ admin: adminFound._id }); // Verifica si 'admin' es el campo correcto
            res.json(users.reverse());
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Error interno del servidor.' });
        }
    },
}

module.exports = userControllers