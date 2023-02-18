const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const generadorToken = require('../helpers/generadorJWT')

module.exports =  {
    indexUser (req, res)  {
        res.send('Hello user!')
    },
    infoUser(req, res) {
        res.json({
            name: "juan"
        })
    },
    session(req, res){
        let usuario = {
            id: "12346asdk",
            name: "Juan",
            role: "USUARIO",
            idioma: "Español"
        }
        let carrito = {
            item1:{
                id:"dasdhsdhlhlsad185",
                cant: 2
            }
        }
        res.cookie("cookieDelUsuario",usuario.idioma,{ maxAge: 60000 })
        res.cookie("cookieCarrito",carrito,{ maxAge: 60000 })
        console.log(req.cookies.cookieDelUsuario)
        req.session.user = usuario;
        res.json(req.session.user)
    },
    consultar(req, res){
        res.json(req.session)
    },
    cerrarSession(req, res){
        req.session.destroy()
        res.clearCookie("cookieDelUsuario")
        res.json({
            msg: "se cerro la session"
        })
    },
    async login (req, res){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email})
                if (usuario == null) {
                    res.json({msg: "la contraseña o el email son incorrectos"})
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: "la contraseña o el email son incorrectos"})
                }

                const user = {
                   _id: usuario._id,
                   name: usuario.name 
                }
                req.session.user = user

                if (req.body.remermber) {
                    res.cookie("sessionDelUsuario",req.session.user,{maxAge: 120000})
                }
                res.json({msg: "usuario logeado"})
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },
    logout(req, res){
        res.clearCookie("sessionDelUsuario")
        req.session.destroy()
        res.json({msg: "session cerrada"})
    },
    async loginConToken(req, res){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email})
                if (usuario == null) {
                    return res.json({msg: "la contraseña o el email son incorrectos"})
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    return res.json({msg: "la contraseña o el email son incorrectos"})
                }

                const token = await generadorToken({id:usuario._id, email:usuario.email})
                res.json({msg: "usuario logeado", token})
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },
    validar(req, res){
        res.send("token correcto")
    }
}


 