const mongoose = require('mongoose')
//Created a const to store the mongoose module (allows create a model Schema)
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    user: {
        ref: 'User', //Referecia a modelo de Usuario
        type: Schema.Types.ObjectId
    },
    date_create: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        maxLength: 800
    },
    image: {
        type: String
    },

},{versionKey:false})

const Publication = mongoose.model("Publication", PublicationSchema)
module.exports = Publication