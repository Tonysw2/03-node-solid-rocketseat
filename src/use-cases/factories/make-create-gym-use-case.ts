import { GymsRepository } from '@/repositories/gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export async function makeCreateGymUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
