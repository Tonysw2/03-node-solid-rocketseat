import { UsersRepository } from '@/repositories/users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository()

  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
