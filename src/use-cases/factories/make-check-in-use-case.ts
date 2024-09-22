import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { GymsRepository } from '@/repositories/gyms-repository'

export async function makeCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository()
  const gymsRepository = new GymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
