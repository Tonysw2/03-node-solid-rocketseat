import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { FetchMemberCheckInsHistoryUseCase } from '../fetch-member-check-ins-history'

export async function makeFetchMemberCheckInsHistoryUseCase() {
  const checkInsRepository = new CheckInsRepository()

  const useCase = new FetchMemberCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
