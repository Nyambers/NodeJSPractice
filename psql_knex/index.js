import Koa from 'koa'
import Router from 'koa-router'
import jsonBody from 'koa-json-body'

import { insert, retrieve, retrieveAll, update } from './data/model.js'

const app = new Koa()
    .use(jsonBody())

const router = new Router()

router
    .post('/users', async (ctx) => {
        const data = ctx.request.body
        const id = await insert(data.name)

        ctx.status = 200
        ctx.body = id[0].id
    })

    .get('/users', async (ctx) => {
        const data = await retrieveAll()

        ctx.status = 200
        ctx.body = data
    })

    .get('/users/:id', async (ctx) => {
        const data = await retrieve(ctx.params.id)

        ctx.status = 200
        ctx.body = data[0]
    })

    .put('/users/:id', async (ctx) => {
        const data = ctx.request.body
        await update(data.name, ctx.params.id)

        ctx.status = 204
    })

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8080, console.log(`Live on 8080`))