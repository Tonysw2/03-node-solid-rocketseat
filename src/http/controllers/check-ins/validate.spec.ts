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

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'JS gym',
        latitude: 0,
        longitude: 0,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gymId,
        userId: user.id,
      },
    })

    const response = await supertest(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })
})
