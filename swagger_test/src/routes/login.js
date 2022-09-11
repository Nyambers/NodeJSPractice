export const routes = (router) => {
    router.post('/login', async (ctx) => {
        ctx.body = {
            message: 'User is Logged in'
        }
    })
}