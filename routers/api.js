const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController")
const { validarID } = require("../middleware/validarID")
const {check} = require("express-validator")

// un metodo http - una exprecion - middleware - callback
router.get("/ver",apiController.verSeleccion)
router.get("/ver/:id",validarID,apiController.buscarPorIdLaSeleccion)
router.get("/buscar/:pais",apiController.busquedaSeleccion)
router.post("/crear",[
    check("nombre").not().isEmpty().withMessage("el campo nombre es obligatorio").isLength({max:15,min:3}).withMessage("el campo nombre debe contar con un maximo de 15 caracteres y un minimo de 3"),
    check("pais").not().isEmpty().withMessage("el campo pais es obligatorio"),
    check("clasifico").not().isEmpty().withMessage("el campo clasifico es obligatorio"),
    check("copas").not().isEmpty().withMessage("el campo copas es obligatorio")
],apiController.guardarSeleccion)
router.put("/editar/:id",validarID,[
    check("nombre").not().isEmpty().withMessage("el campo nombre es obligatorio para editar").isLength({max:15,min:3}).withMessage("el campo nombre debe contar con un maximo de 15 caracteres y un minimo de 3"),
    check("pais").not().isEmpty().withMessage("el campo pais es obligatorio para editar"),
    check("clasifico").not().isEmpty().withMessage("el campo clasifico es obligatorio para editar"),
    check("copas").not().isEmpty().withMessage("el campo copas es obligatoriopara editar")
], apiController.editarLaSeleccion)
router.delete("/eliminar/:id",validarID, apiController.eliminarSeleccion)

module.exports = router