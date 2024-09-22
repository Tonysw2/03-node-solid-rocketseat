import { GymsRepository } from '@/repositories/gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export async function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
