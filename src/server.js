const fastify = require('fastify')({ logger: true });
const users = require('./data/users.json');

fastify.route({
    method: 'GET',
    url: '/users',
    schema: {
        querystring: {
            username: { type: 'string' }
        }
    },
    handler: function (request, reply) {
        const username = request.query.username;
        if (!username) {
            return reply.send({ users: [] });
        }
        const user = users.find(user => user.username === username);
        const response = user ? [user] : [];
        return reply.send({ users: response });
    }
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();
