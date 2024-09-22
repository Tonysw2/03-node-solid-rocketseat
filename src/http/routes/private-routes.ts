import type { FastifyInstance } from 'fastify'
import { profile } from '../controllers/users/profile'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function privateRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/me', profile)
}
