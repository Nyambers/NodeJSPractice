const Koa = require('koa')
const Router = require('koa-router')
const jsonBody = require('koa-json-body')
const swagger2Koa = require('swagger2-koa')
const swagger = require('swagger2')
const model = require('./data/model')

// swagger
const { ui, validate } = swagger2Koa
const spec = swagger.loadDocumentSync('./swagger.yaml')

if (!swagger.validateDocument(spec)) {
    throw Error('Invalid swagger file')
}


const app = new Koa()
    .use(jsonBody())
    .use(validate(spec))

const router = new Router({ prefix: '/v1' })

router
    .post('/users', async (ctx) => {
        const data = ctx.request.body
        console.log(`POST request called, Header: ${JSON.stringify(data)}`)
        const id = await model.insert(data.name)

        ctx.status = 200
        ctx.body = id[0]
    })

    .get('/users', async (ctx) => {
        console.log(`GET users Request called`)
        const data = await model.retrieveAll()

        ctx.status = 200
        ctx.body = data
    })

    .get('/users/:id', async (ctx) => {
        console.log(`GET user Request called, Param: ${JSON.stringify(ctx.params)}`)
        const data = await model.retrieve(ctx.params.id)

        ctx.status = 200
        ctx.body = data[0]
    })

    .put('/users/:id', async (ctx) => {
        const data = ctx.request.body
        console.log(`PUT request`)
        console.log(`Param: ${JSON.stringify(ctx.params)}`)
        console.log(`Body: ${JSON.stringify(ctx.body)}`)
        const new_data = await model.update(ctx.params.id, data.name)

        ctx.status = 204
    })

    .delete('/users/:id', async (ctx) => {
        console.log(`DELETE request`)
        console.log(`Param: ${JSON.stringify(ctx.params)}`)
        await model.deleteUser(ctx.params.id)

        ctx.status = 204
    })
    
    .get('/swagger.json', async (ctx) => {
        ctx.body = spec
    })

app.use(router.routes())
app.use(router.allowedMethods())
app.use(ui(spec, '/docs'))
app.listen(8080, console.log(`Live on 8080`))