import { prisma } from '@/lib/prisma'
import type { Gym, Prisma } from '@prisma/client'
import type {
  FindManyNearbyParams,
  IGymsRepository,
} from './interfaces/gyms-repository-interface'

export class GymsRepository implements IGymsRepository {
  async searchMany(title: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: title,
        },
      },

      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }
}
