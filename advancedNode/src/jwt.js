const jwt = require('jsonwebtoken')
const koaJwt = require('koa-jwt')
const dotenv = require('dotenv-safe')

dotenv.config()

const secret = process.env['SECRET']

const generateToken = (user) => {
    return jwt.sign({
        user,
        iat: Math.floor((Date.now()/1000) + 3600)
    }, secret)
}

const jwtMiddleware = () => koaJwt({secret})

module.exports = {
    generateToken,
    jwtMiddleware
}