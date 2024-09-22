import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchMemberCheckInsHistoryUseCase } from './fetch-member-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchMemberCheckInsHistoryUseCase

describe('Fetch Member Check-In History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchMemberCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    await checkInsRepository.create({
      gymId: 'gym-id-2',
      userId: 'user-id',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-id' }),
      expect.objectContaining({ gymId: 'gym-id-2' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-id',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
  })
})
