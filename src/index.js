const { request } = require('http');

const fastify = require('fastify')({
    logger: true
});
const productsRoutes = require('./routes/products.routes');
const swagger = require('./utils/swagger')

require('./utils/mongoose')

fastify.register(require('fastify-swagger'), swagger.options)

fastify.get("/", (request, reply) => {
    reply.send({ hello: "world" });
})

productsRoutes.forEach(route => {
    fastify.route(route);
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        fastify.log.info(`Server listening at ${fastify.server.address()}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();