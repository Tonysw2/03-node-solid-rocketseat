import type { ICheckInsRepository } from '@/repositories/interfaces/check-ins-repository-interface'
import type { CheckIn } from '@prisma/client'

interface FetchMemberCheckInsHistoryUseCaseRequest {
  page: number
  userId: string
}

interface FetchMemberCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    page,
    userId,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
