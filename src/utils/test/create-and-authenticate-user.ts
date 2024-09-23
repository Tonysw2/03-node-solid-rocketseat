import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('123123123', 10),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
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
