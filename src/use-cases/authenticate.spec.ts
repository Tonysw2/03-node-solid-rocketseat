import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import bcryptjs from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      passwordHash: await bcryptjs.hash('password123', 10),
    })

    const { user } = await sut.execute({
      email: 'john.doe@email.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => {
      return sut.execute({
        email: 'john.doe@email.com',
        password: 'password123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      passwordHash: await bcryptjs.hash('password123', 10),
    })

    await expect(() => {
      return sut.execute({
        email: 'john.doe@email.com',
        password: '123123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
