module.exports = (req, res, next) =>{
    if (!req.session.user) {
        res.json({
            msg: "el usuario no esta en session"
        })
    } else {
        next()
    }
}