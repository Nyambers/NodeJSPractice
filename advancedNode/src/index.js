const Koa = require('koa')
const Router = require('koa-router')
const helmet = require('koa-helmet')
const jsonBody = require('koa-json-body')

const { jwtMiddleware, generateToken } = require('./jwt')
const { isAuthorized } = require('./user')

// constants
const app = new Koa()
const router = new Router()

const port = process.env.PORT || 8080

// Routes
router.get('/', async (ctx) => {
    ctx.status = 200
    ctx.body = { message: 'Accessed Public Route'}
})

router.post('/login', async (ctx) => {
    const data = ctx.request.body

    if (!isAuthorized(data)) {
        ctx.status = 401
        ctx.body = { message: 'Wrong username/password' }
        return
    }

    ctx.status = 200
    ctx.body = { token: generateToken(data.username) }
})

router.get('/private', jwtMiddleware(), async (ctx) => {
    ctx.status = 200
    ctx.body = { message: 'Accessed Private Route' }
})

// 401 Handler
app.use(async (ctx, next) => {
    try {
        return await next()
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401
            ctx.response.body = { message: 'Unauthenticated' }
        } else {
            throw err
        }
    }
})

// Middleware
app.use(jsonBody())
app.use(helmet())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, console.log(`Listening on port: ${port}`))