const express = require('express')
const commentController = require('../../controllers/publicationsControllers/comments')


const router = express.Router()

//crear comentario
router.post('/create', commentController.createComment)

//actualizar comentario
router.patch('/update/:id', commentController.updateComment)

//eliminar comentario
router.delete('/delete/:id', commentController.deleteComment)

module.exports = router


