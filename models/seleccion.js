const mongoose = require("mongoose")

const Schema = mongoose.Schema
const seleccion = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    pais: {
        type: String,
        required: true
    },
    img:{
        type: String
    },
    clasifico:{
        type: Boolean,
        required: true
    },
    copas:{
        type: Number,
        required: true
    }
})

const NationalTeams = mongoose.model('NationalTeam',seleccion)
module.exports = {NationalTeams}