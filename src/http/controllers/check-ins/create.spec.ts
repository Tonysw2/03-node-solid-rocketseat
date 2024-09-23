import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'JS gym',
        latitude: 0,
        longitude: 0,
      },
    })

    const response = await supertest(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        longitude: 0,
        latitude: 0,
      })

    expect(response.status).toEqual(201)
  })
})
