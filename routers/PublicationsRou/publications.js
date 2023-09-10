const express = require('express')
const authJwt = require('../../middlewares/authJwt')
const controllerPublication = require('../../controllers/publicationsControllers/publications')


const router = express.Router()

//rutas 
//crear publicación
router.post('/create', authJwt.verifyToken,controllerPublication.create)

//buscarpublicaciones
router.get('/', controllerPublication.getPublication)

//publicaiones por ID
router.get('/:id', controllerPublication.getPublicationById)

//actualizar la publicación
router.patch('/update/:id',authJwt.verifyToken,controllerPublication.updatePublication)

//eliminar publicación
router.delete('/delete/:id',[authJwt.verifyToken,authJwt.isAdmin],controllerPublication.deletePublication)

module.exports = router
