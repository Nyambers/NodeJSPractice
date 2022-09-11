// imports
import koa from 'koa'
import swagger2Koa from 'swagger2-koa'
import * as swagger from 'swagger2'
import Router from '@koa/router'
import koaBody from 'koa-body'

import { routes as registerRoute } from './routes/register.js'
import { routes as loginRoute } from './routes/login.js'
import { routes as deleteUserRoute } from './routes/deleteUser.js'
import { routes as postRoute } from './routes/posts.js'

// consts
const { ui, validate } = swagger2Koa

const spec = swagger.loadDocumentSync('./src/swagger.yaml')

if (!swagger.validateDocument(spec)) {
    throw Error('Invalid swagger file')
}

const port = process.env.PORT || 3000

const app = new koa()

const router = Router({ prefix: '/v1' })

for (const routes of [
    registerRoute,
    loginRoute,
    deleteUserRoute,
    postRoute
]) {
    routes(router)
}

router.get('/swagger.json', (ctx) => {
    ctx.body = spec
})

app.use(koaBody())
app.use(validate(spec))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(ui(spec, '/docs'))
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})