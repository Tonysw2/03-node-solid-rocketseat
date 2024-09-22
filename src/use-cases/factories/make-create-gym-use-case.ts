import { GymsRepository } from '@/repositories/gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
