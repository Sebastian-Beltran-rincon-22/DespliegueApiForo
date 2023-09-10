const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ROLE = ["admin","user"] //Roles existentes

const adminSchema = new Schema({

    name: String

},{versionKey:false})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = {

    Admin:Admin,

    ROLE:ROLE
}