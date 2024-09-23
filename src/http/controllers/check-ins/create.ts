import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = checkInParamsSchema.parse(request.params)

  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  try {
    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    reply.code(201)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.code(404).send({ error: error.message })
    }

    if (error instanceof MaxDistanceError) {
      reply.code(422).send({
        error: error.message,
      })
    }

    if (error instanceof MaxNumberOfCheckInsError) {
      reply.code(429).send({ error: error.message })
    }

    throw error
  }
}
