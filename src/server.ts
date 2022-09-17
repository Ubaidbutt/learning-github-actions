import { fastify } from 'fastify';
import type { FastifyReply, FastifyRequest } from 'fastify';

import users from './data/users.json';

const server = fastify({ logger: true });

server.route({
    method: 'GET',
    url: '/users',
    schema: {
        querystring: {
            username: { type: 'string' }
        }
    },
    handler: function (request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as { username: string };
        const { username } = query;
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
        await server.listen({ port: 3000 })
    } catch (err: unknown) {
        server.log.error(err)
        process.exit(1)
    }
}

start();