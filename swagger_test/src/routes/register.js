export const routes = (router) => {
    router.post('/register', async (ctx) => {
        console.log('register endpoint accessed')
        ctx.body = {
            message: 'User is Registered'
        }
    })
}