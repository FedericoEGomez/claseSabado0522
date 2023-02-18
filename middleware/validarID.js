const {NationalTeams} = require("../models/seleccion")
const validarID = async (req, res, next) =>{
    try {
        const team = await NationalTeams.findById(req.params.id)
        if (team !== null) {
            next()
        } else {
           res.status(500).json({msg: "el id es invalido"}) 
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { validarID }