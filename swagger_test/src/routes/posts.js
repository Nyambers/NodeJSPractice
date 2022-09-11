export const routes = (router) => {
    router.get('/posts', async (ctx) => {
        // response body must conform PostsBase swagger schema
        ctx.body = {
            owner: 'Joseph',
            title: "Joseph's Swagger Project",
            body: "Random body"
        }
    })
}