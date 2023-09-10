const mongoose = require('mongoose')

const Schema = mongoose.Schema

const interacSchema = new Schema({

    reactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //Referecia a modelo de Usuario
    }],
    shares:{
        type: String
    },
    
    publication:{
        ref: 'Publication', //Referecia a modelo de publicacion
        type: mongoose.Schema.Types.ObjectId
    }

},{versionKey:false})

module.exports = mongoose.model('Interactions',interacSchema)