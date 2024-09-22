import { GymsRepository } from '@/repositories/gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export async function makeSearchGymsUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
