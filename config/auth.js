const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
    //modelo usuario
require('../models/user')
const Usuario = mongoose.model('User')
module.exports = function(passport) {
    passport.use(new localStrategy({ usernameField: "email", passwordField: "password" }, (username, password, done) => {
        Usuario.findOne({ email: username }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Esta conta não existe" })
            }

            bcrypt.compare(password, user.password, (erro, batem) => {
                if (batem) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "Senha Incorreta" })
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, user) => {
            done(err, user)
        })
    })
}