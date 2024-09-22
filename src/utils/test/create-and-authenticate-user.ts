import type { FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await supertest(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123123123',
  })

  const authResponse = await supertest(app.server).post('/sessions').send({
    email: 'john.doe@example.com',
    password: '123123123',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
