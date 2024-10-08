import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetrics() {
  const checkInsRepository = new CheckInsRepository()

  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
