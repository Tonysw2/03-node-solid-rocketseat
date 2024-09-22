import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import type { ICheckInsRepository } from '@/repositories/interfaces/check-ins-repository-interface'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: ICheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    await checkInsRepository.create({
      gymId: 'gym-2',
      userId: 'user-1',
    })

    const { checkInsCount } = await sut.execute({ userId: 'user-1' })

    expect(checkInsCount).toEqual(2)
  })
})
