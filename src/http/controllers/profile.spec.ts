import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const profileResponse = await supertest(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: 'john.doe@example.com',
      }),
    )
  })
})
