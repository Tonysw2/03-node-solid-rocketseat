import { makeGetUserMetrics } from '@/use-cases/factories/make-get-user-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetrics()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  reply.code(200).send({ checkInsCount })
}
