const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Hacer referencia al modelo de usuario
        required: true,
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication', // Hacer referencia al modelo de publicación
        required: true,
    },
}, { versionKey: false,timestamps:true });

module.exports = mongoose.model('Comments', commentSchema);
