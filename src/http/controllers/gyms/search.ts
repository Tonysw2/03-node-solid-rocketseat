import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    title: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { title, page } = searchGymQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    title,
    page,
  })

  reply.code(200).send({ gyms })
}
