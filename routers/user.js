const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const auth = require("../middleware/auth")
const {check} = require("express-validator")
const validarJWT = require('../middleware/validarToken')


router.get("/",userController.indexUser)
router.get("/info",userController.infoUser)
router.get("/session", userController.session)
router.get("/consultar", auth, userController.consultar)
router.get("/cerrarsession", userController.cerrarSession)
router.post("/login", [
    check("email").not().isEmpty().withMessage("se requiere el campo email"),
    check("password").not().isEmpty().withMessage("se requiere el campo password")
],userController.loginConToken)
router.delete("/logout", userController.logout)
router.get('/validar',validarJWT,userController.validar)


module.exports = router