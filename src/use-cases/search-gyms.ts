import type { IGymsRepository } from '@/repositories/interfaces/gyms-repository-interface'
import type { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  page: number
  title: string
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    page,
    title,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(title, page)

    return {
      gyms,
    }
  }
}
