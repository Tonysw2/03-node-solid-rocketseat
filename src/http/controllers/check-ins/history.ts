import { makeFetchMemberCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-member-check-ins-history-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchMemberCheckInsHistoryUseCase =
    makeFetchMemberCheckInsHistoryUseCase()

  const { checkIns } = await fetchMemberCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  reply.code(200).send({ checkIns })
}
