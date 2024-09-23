import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the total count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'JS gym',
        latitude: 0,
        longitude: 0,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gymId,
          userId: user.id,
        },
        {
          gymId,
          userId: user.id,
        },
      ],
    })

    const response = await supertest(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
