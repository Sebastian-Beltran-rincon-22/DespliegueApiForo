const {Admin} = require('../models/admin')
const User = require('../models/user')
const config = require('../config')

const rolAdmin ={
    createAdmin : async () =>{
    try{    
        const count = await Admin.estimatedDocumentCount()

        if (count > 0 ) return

        const values = await Promise.all([
            new Admin({name: "user"}).save(),
            new Admin({name: "admin"}).save()
        ])
    
    console.log(values)
    }catch ( error){
        console.error(error)
    }
},

    adminprint : async () =>{

        const userFound = await  User.findOne({email: config.ADMIN_EMAIL})
        console.log(userFound)
        if (userFound) return

        const admin = await Admin.find({name: {$in:["admin"]}})

        const userRegis = await User.create({
            userName: config.ADMIN_USERNAME,
            email: config.ADMIN_EMAIL,
            password: config.ADMIN_PASSWORD,
            admin: admin.map((admins) =>admins._id)
        })

        console.log(`new user created: ${userRegis.email}`)
    }
}

module.exports = rolAdmin.createAdmin

