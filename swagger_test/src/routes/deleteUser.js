export const routes = (router) => {
    router.delete('/delete-user', async (ctx) => {
        ctx.body = {
            message: 'User is Deleted',
        }
    })
}