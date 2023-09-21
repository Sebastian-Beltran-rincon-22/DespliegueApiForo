const express = require('express')
const userControllers = require ('../controllers/auth')
const verifySignup = require ('../middlewares/verifySignup')
const authJwt = require('../middlewares/authJwt')
const router = express.Router()

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    }); // validaciones para token en la aplicacion 

router.post('/signup',[verifySignup.checkDupletUserNameOrEmail,verifySignup.checkRoleExist],
    userControllers.signup 
) // ruta registro con validaciones 

router.post('/signin',userControllers.signin) // ruta inicio de sesión

router.get('/',authJwt.verifyToken,userControllers.getsingup) //buscar todos los usuarios

router.get('/usersByRole',userControllers.getUsersByRole)

router.post('/change-password', authJwt.verifyToken,userControllers.changePassword)

router.post("/send-password-link", userControllers.sendPasswordLink)


module.exports = router
