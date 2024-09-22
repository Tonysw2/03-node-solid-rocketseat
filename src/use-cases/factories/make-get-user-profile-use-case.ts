import { UsersRepository } from '@/repositories/users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new UsersRepository()

  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
