import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { type Gym, Prisma } from '@prisma/client'
import type {
  FindManyNearbyParams,
  IGymsRepository,
} from '../interfaces/gyms-repository-interface'

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(title: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(title))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      const MAX_DISTANCE = 10 // kilometers

      return distance <= MAX_DISTANCE
    })

    return gyms
  }
}
