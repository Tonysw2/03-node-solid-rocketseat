import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await supertest(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123123123',
    })

    expect(response.statusCode).toEqual(201)
  })
})
