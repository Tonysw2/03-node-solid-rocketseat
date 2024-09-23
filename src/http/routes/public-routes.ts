import type { FastifyInstance } from 'fastify'
import { refresh } from '../controllers/refresh'
import { authenticate } from '../controllers/users/authenticate'
import { register } from '../controllers/users/register'

export async function publicRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
