import type { FastifyInstance } from 'fastify'
import { checkInsRoutes } from '../controllers/check-ins/routes'
import { gymsRoutes } from '../controllers/gyms/routes'
import { profile } from '../controllers/users/profile'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function privateRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/me', profile)

  app.register(gymsRoutes)
  app.register(checkInsRoutes)
}
