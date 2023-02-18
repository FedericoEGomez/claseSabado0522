const {NationalTeams} = require("../models/seleccion")
const {validationResult} = require("express-validator")

module.exports = {
    async verSeleccion (req, res) {
        const items = await NationalTeams.find()//nos trae todo
        res.status(200).json({items})
    },
    async guardarSeleccion(req, res){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const item = new NationalTeams(req.body)
                await item.save()
                res.status(201).json({item})
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json(error)
        } 
    },
    async busquedaSeleccion  (req, res) {
        const item = await NationalTeams.findOne({pais: req.params.pais}) //busca por parametro
        res.status(200).json({ item })
    },
    async buscarPorIdLaSeleccion  (req, res) {
        const item = await NationalTeams.findById(req.params.id) //busca por id
        res.status(200).json({ item })
    },
    async editarLaSeleccion (req, res){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                await NationalTeams.findByIdAndUpdate(req.params.id,req.body)
                res.status(201).json(req.body)
            } else {
               res.status(501).json(err) 
            }  
        } catch (error) {
            res.status(501).json(error)
        }
    },
    async eliminarSeleccion(req, res){
        const seleccion = await NationalTeams.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "adios seleccion", seleccion})
    }
}