const express = require('express')
const authJwt = require('../../middlewares/authJwt')
const interacControllers = require('../../controllers/publicationsControllers/interactions')

const router = express.Router()

// Ruta para dar like a una interacción
router.post('/like/:id', interacControllers.likeInteraction);

// Ruta para quitar like de una interacción
router.post('/unlike/:id', interacControllers.unlikeInteraction);


module.exports = router